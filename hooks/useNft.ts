import {gql} from "@apollo/client";

export const SEND_PENDING_TRANSACTION_OPEN_BOX = gql`
    mutation($tx_hash: String!) {
        sendPendingTransactionOpenBox (tx_hash: $tx_hash)
    }
`


export const MINT_NFT = gql`
    mutation($tokenId: Float!) {
        mintNft (tokenId: $tokenId) {
            token_id,
            metadata,
            image_md,
            metadata_link
        }
    }
`