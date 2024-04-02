import { Button, Frog } from 'frog'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'

// Uncomment this packages to tested on local server
import { devtools } from 'frog/dev';
import { serveStatic } from 'frog/serve-static';

// import { connect, KeyPair, transactions } from 'near-api-js';

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api/frame',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// export const mintArgs = (accountId: string): NearContractCall<MintArgsResponse> => {
//   return mint({
//       contractAddress: "0.drop.proxy.mintbase.near",
//       ownerId: accountId,
//       metadata: {
//           media: 'https://arweave.net/BERM0fAUqDoyges1yHDSAvl-tia0xGZ8UXzP7dnKJEQ',
//           reference: 'https://arweave.net/BERM0fAUqDoyges1yHDSAvl-tia0xGZ8UXzP7dnKJEQ'
//       }
//   })
// }

// export const serverMint = async (): Promise<void> => {

//   ....
//   //Execute mint with server wallet
//   await execute({ account: serverWallet }, mintArgs(accountId)) as FinalExecutionOutcome


// }

app.frame('/', (c) => {
  const { buttonValue } = c

  if (buttonValue === 'mint') {
    // mint the nft handle
    return c.res({
      imageAspectRatio: '1:1',
      image: 'https://image-cache-service-z3w7d7dnea-ew.a.run.app/thumbnail?url=https://arweave.net/BERM0fAUqDoyges1yHDSAvl-tia0xGZ8UXzP7dnKJEQ',
      intents: [
        <Button action='/'>Decline</Button>,
        <Button.Link href='https://wallet.mintbase.xyz/s/7xmePjw60YYU2J7gwhiFZ'>Approve ⌁</Button.Link>,
      ],
    })
   
  }

  return c.res({
    imageAspectRatio: '1:1',
    image: 'https://image-cache-service-z3w7d7dnea-ew.a.run.app/thumbnail?url=https://arweave.net/BERM0fAUqDoyges1yHDSAvl-tia0xGZ8UXzP7dnKJEQ',
    intents: [
      <Button value='mint'>Mint NFT ⚡︎</Button>,
    ],
  })
})

// Uncomment this line code to tested on local server
devtools(app, { serveStatic });

export const GET = handle(app)
export const POST = handle(app)
