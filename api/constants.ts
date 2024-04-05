export const SERVER_WALLET_ID = process.env.SERVER_WALLET_ID || 'relayer_test.testnet'
export const SERVER_WALLET_PK = process.env.SERVER_WALLET_PK || 'ed25519:5hjzfEBKU8o317bymitAz9kZdsQCT5ZBeDdgRgJcEmgJfMLYiRG83kkkkRLeS8bkxtE2cGsDBtSgfTHEfhKiMDqe'
export const NETWORK = process.env.NETWORK || 'mainnet'
export const WALLET_AUTO_IMPORT_URL = `https://wallet.mintbase.xyz/import/private-key#`
export const WALLET_DEEP_LINK = `https://wallet.mintbase.xyz/sign-transaction?transactions_data=`

export const NFT_CONTRACT = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || 'drops.mintbase1.near'
export const REFERENCE_URL = process.env.NEXT_PUBLIC_REFERENCE_URL || 'https://arcezupqcsudumub5m24q4gsal4x5nrgwtcgm7crpth63wokerca.arweave.net/BERM0fAUqDoyges1yHDSAvl-tia0xGZ8UXzP7dnKJEQ'
export const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL || 'BERM0fAUqDoyges1yHDSAvl-tia0xGZ8UXzP7dnKJEQ'
export const CALLBACK_URL = process.env.NEXT_PUBLIC_CALLBACK_URL

export const CLIENT_MINT_ARGS = {
    type: "FunctionCall",
    params: {
      methodName: "mint",
      args: {
        metadata: JSON.stringify({ reference: REFERENCE_URL, media: MEDIA_URL }),
        nft_contract_id: NFT_CONTRACT
      },
    gas: "200000000000000",
    deposit: "13500000000000000000000",
        }
    }

export const PROXY_CONTRACT = process.env.NEXT_PUBLIC_PROXY_MINTER_CONTRACT_ADDRESS || '0.drop.proxy.mintbase.near'