import {gql} from "@apollo/client";

export const SEND_PENDING_TRANSACTION_OPEN_BOX = gql`
    mutation($tx_hash: String!) {
        sendPendingTransactionOpenBox (tx_hash: $tx_hash)
    }
`