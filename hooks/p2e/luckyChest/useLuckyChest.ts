import {ApolloError, ApolloQueryResult, gql, useQuery} from "@apollo/client";
import {ChestDetail} from "../../../src/generated/graphql_p2e";
import {isEmpty} from "lodash";

type GetChestDetailProps = {
  type?: string,
  tier?: string,
}

export const useGetChestDetail = ({type, tier}: GetChestDetailProps): {
  getChestDetailLoading: boolean,
  getChestDetailError: ApolloError | undefined,
  refetchChestDetail: () => Promise<ApolloQueryResult<any>>,
  getChestDetailData: {
    getChestDetail: ChestDetail
  },
} => {
  const {
    loading: getChestDetailLoading,
    error: getChestDetailError,
    refetch: refetchChestDetail,
    data: getChestDetailData,
  } = useQuery(GET_CHEST_DETAIL, {
    variables: {
      type: type,
      tier: tier,
    },
    skip: isEmpty(type) || isEmpty(tier),
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "no-cache"
  })

  return {
    getChestDetailLoading,
    getChestDetailError,
    refetchChestDetail,
    getChestDetailData,
  }
}

const GET_CHEST_DETAIL = gql`
  query($type: LuckyChestType!, $tier: LuckyChestTier!) {
    getChestDetail(type: $type, tier: $tier) {
      id
      type
      desc
      ticket_cost
      ticket_cost_type
      created_at
      updated_at
      sponsors {
        uid
        name
        img
        link
      }
      prizes {
        id
        title
        desc
        prize_type
        prize_amount
        quantity_in_stock
        valued_at
        user_prize_history {
          uid
          type
          prize_id
          prize {
            id
            title
            desc          
          }
          is_claimed
        }
      }
    }
  }
`