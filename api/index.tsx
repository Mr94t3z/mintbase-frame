import { Button, Frog } from 'frog';
import { handle } from 'frog/vercel';
import { MEDIA_URL, NFT_CONTRACT, REFERENCE_URL } from './constants.js';
import { mint, MintArgsResponse, NearContractCall } from '@mintbase-js/sdk';
import dotenv from 'dotenv';
// Uncomment this packages to tested on local server
// import { devtools } from 'frog/dev';
// import { serveStatic } from 'frog/serve-static';

// Load environment variables from .env file
dotenv.config();

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api/frame',
  imageOptions: {
    /* Other default options */
    fonts: [
      {
        name: 'Montserrat',
        source: 'google',
      },
      {
        name: 'Space Mono',
        source: 'google',
      },
    ],    
  },
});

export const mintArgs = (accountId: string): NearContractCall<MintArgsResponse> => {
  return mint({
      contractAddress: NFT_CONTRACT,
      ownerId: accountId,
      metadata: {
          media: MEDIA_URL,
          reference: REFERENCE_URL
      }
  });
};

const imageUrl = process.env.NEXT_PUBLIC_MEDIA_URL || '';

app.frame('/', async (c) => {
  const { buttonValue } = c;

  if (buttonValue === 'mint') {
    try {
      const mintParams = await mintArgs("");
      const action = { type: "FunctionCall", params: mintParams };
      const txArgs = JSON.stringify({ receiverId: "1.minsta.mintbus.near", actions: [action] });

      return c.res({
        imageAspectRatio: '1:1',
        image: imageUrl,
        intents: [
          <Button action='/'>Decline</Button>,
          <Button.Link href={`https://testnet.wallet.mintbase.xyz/sign-transaction?transactions_data=[${encodeURIComponent(txArgs)}]`}>Approve ⌁</Button.Link>,
        ],
      });
    } catch (error) {
      console.error("Error during minting process:", error);
      // Render an error state frame or message to the user
      return c.res({
        image: (
          <div
            style={{
              alignItems: 'center',
              background: 'linear-gradient(to right, #432889, #FD2227)',
              backgroundSize: '100% 100%',
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
              height: '100%',
              justifyContent: 'center',
              textAlign: 'center',
              width: '100%',
              color: 'white',
              fontSize: 60,
              fontFamily: 'Space Mono',
              letterSpacing: '-0.025em',
              lineHeight: 1.4,
              marginTop: 0,
              padding: '0 120px',
              whiteSpace: 'pre-wrap',
            }}
          >
          
              <div
              style={{ color: 'white', display: 'flex', fontSize: 30, flexDirection: 'column', marginBottom: 60 }}>
                <p style={{ justifyContent: 'center', textAlign: 'center', fontSize: 40}}>Something went wrong!</p>
              </div>
          </div>
        ),
        intents: [
          <Button action='/'>Try Again</Button>,
        ],
      });
    }
  }

  return c.res({
    imageAspectRatio: '1:1',
    image: imageUrl,
    intents: [
      <Button value='mint'>Mint NFT ⚡︎</Button>,
    ],
  });
});

// Uncomment for local server testing
// devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
