import {ApolloError, ApolloQueryResult, gql, useApolloClient, useQuery} from "@apollo/client";
import {ChestDetail, LuckyChestUserInfo} from "../../../src/generated/graphql_p2e";
import {isEmpty} from "lodash";

type GetChestDetailProps = {
  type?: string,
  tier?: string,
}

type GetUserHistoryProps = {
  type?: string,
  tier?: string,
}

export type ClaimChestPrizeProps = {
  user_prize_history_uid: string,
  onError?: (error: ApolloError) => void,
  onCompleted?: (data: any) => void,
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

export const useGetUserHistory = ({type, tier}: GetUserHistoryProps): {
  getUserHistoryLoading: boolean,
  getUserHistoryError: ApolloError | undefined,
  refetchUserHistory: () => Promise<ApolloQueryResult<any>>,
  getUserHistoryData: {
    getLuckyChestUserInfo: LuckyChestUserInfo
  },
} => {
  const {
    loading: getUserHistoryLoading,
    error: getUserHistoryError,
    refetch: refetchUserHistory,
    data: getUserHistoryData,
  } = useQuery(GET_LUCKY_CHEST_USER_INFO, {
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
    getUserHistoryLoading,
    getUserHistoryError,
    refetchUserHistory,
    getUserHistoryData,
  }
}

export const useClaimChestPrize = (): {
  claimChestPrize: ({user_prize_history_uid, onCompleted, onError}: ClaimChestPrizeProps) => Promise<any>
} => {
  const client = useApolloClient()
  const claimChestPrize = async ({user_prize_history_uid, onCompleted, onError}: ClaimChestPrizeProps) => {
    try {
      const result = await client.mutate({
        mutation: CLAIM_CHEST_PRIZE,
        variables: {
          user_prize_history_uid: user_prize_history_uid,
        },
        context: {
          endpoint: 'p2e'
        }
      })
      onCompleted && onCompleted(result)
    } catch (error: any) {
      onError && onError(error)
    }
  }

  return {
    claimChestPrize
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

const GET_LUCKY_CHEST_USER_INFO = gql`
  query($type: LuckyChestType!, $tier: LuckyChestTier!) {
    getLuckyChestUserInfo(type: $type, tier: $tier) {
      history {
        uid
        type
        tier
        prize_id
        prize {
          id
          title
          desc
          img
          prize_type
          rarity
          prize_amount
          updated_at
        }
        is_claimed
      }
    }
  }
`

const CLAIM_CHEST_PRIZE = gql`
  mutation($user_prize_history_uid: String!) {
    claimChestPrize(user_prize_history_uid: $user_prize_history_uid)
  }
`