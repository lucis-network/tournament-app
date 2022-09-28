import {useState} from "react";
import {ApolloError, gql, useMutation} from "@apollo/client";
import {MutationClaimGiftCardArgs, MutationClaimNftBoxArgs} from "../../../../../../src/generated/graphql_p2e";

export function useClaimGiftCard(
  args: MutationClaimGiftCardArgs,
): {
  loading: boolean,
  claimGiftCard: () => Promise<boolean | ApolloError>,
} {
  const [claimGiftCard] = useMutation(CLAIM_GIFT_CARD);
  const [loading, setLoading] = useState(false);

  const mutate = (): Promise<boolean | ApolloError> => {
    return new Promise( async (resolve, reject) => {
      // is gift card then can claim right away
      setLoading(true);

      const p = claimGiftCard({
        variables: {
          "user_inventory_item_uid": args.user_inventory_item_uid
          // "user_inventory_item_uid": "cl89wm1qm16890jo3ndma9bkZ34567890"
        },
        context: {
          endpoint: 'p2e'
        },
        fetchPolicy: "network-only",
      });
      try {
        const res = await p;
        // console.log('{claimGiftCard} res: ', res);

        resolve(res.data);
      } catch (e) {
        // console.log('{claimGiftCard} e: ', e);
        // There some logic error
        // there was not 200 status or some client error
        reject(e)
      } finally {
        setLoading(false);
      }
    })
  }

  return {
    loading,
    claimGiftCard: mutate,
  }
}


export function useClaimNftBox(
  args: MutationClaimNftBoxArgs,
): {
  loading: boolean,
  claimNftBox: () => Promise<boolean | ApolloError>,
} {
  const [claimNftBox] = useMutation(CLAIM_NFT_BOX);
  const [loading, setLoading] = useState(false);

  const mutate = (): Promise<boolean | ApolloError> => {
    return new Promise( async (resolve, reject) => {
      // is gift card then can claim right away
      setLoading(true);

      const p = claimNftBox({
        variables: args,
        context: {
          endpoint: 'p2e'
        },
        fetchPolicy: "network-only",
      });
      try {
        const res = await p;
        // console.log('{claimGiftCard} res: ', res);

        resolve(res.data);
      } catch (e) {
        // console.log('{claimGiftCard} e: ', e);
        // There some logic error
        // there was not 200 status or some client error
        reject(e)
      } finally {
        setLoading(false);
      }
    })
  }

  return {
    loading,
    claimNftBox: mutate,
  }
}

export const CLAIM_GIFT_CARD = gql`
  mutation claimGiftCard($user_inventory_item_uid: String!) {
    claimGiftCard(user_inventory_item_uid: $user_inventory_item_uid)
  }
`

export const CLAIM_NFT_BOX = gql`
  mutation claimNftBox($prize_id: Float!, $address: String!) {
    claimNftBox(prize_id: $prize_id, address: $address) {
      tx_hash
    }
  }
`
