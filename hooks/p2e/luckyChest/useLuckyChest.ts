import {ApolloError, ApolloQueryResult, gql, useApolloClient, useQuery} from "@apollo/client";
import {ChestDetail, LuckyChestUserInfo} from "../../../src/generated/graphql_p2e";
import {isEmpty} from "lodash";

type GetChestDetailProps = {
  game_platform_id?: number,
  tier: string,
}

type GetUserHistoryProps = {
  game_platform_id?: number,
  tier?: string,
  page?: number,
  limit?: number,
}

export type ClaimChestPrizeProps = {
  user_prize_history_uid: string,
  address?: string,
  onError?: (error: ApolloError) => void,
  onCompleted?: (data: any) => void,
}

export const useGetChestDetail = ({game_platform_id, tier}: GetChestDetailProps): {
  getChestDetailLoading: boolean,
  getChestDetailError: ApolloError | undefined,
  refetchChestDetail: ({game_platform_id, tier}: GetChestDetailProps) => Promise<ApolloQueryResult<any>>,
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
      game_platform_id: game_platform_id,
      tier: tier,
    },
    context: {
      endpoint: 'p2e'
    },
    skip: true
  })

  return {
    getChestDetailLoading,
    getChestDetailError,
    refetchChestDetail,
    getChestDetailData,
  }
}

export const useGetLuckyChestUserInfo = ({game_platform_id, tier, page, limit}: GetUserHistoryProps): {
  getLuckyChestUserInfoLoading: boolean,
  getLuckyChestUserInfoError: ApolloError | undefined,
  refetchGetLuckyChestUserInfo: ({game_platform_id, tier, page, limit}: GetUserHistoryProps) => Promise<ApolloQueryResult<any>>,
  dataLuckyChestUserInfo: LuckyChestUserInfo,
} => {
  const {
    loading: getLuckyChestUserInfoLoading,
    error: getLuckyChestUserInfoError,
    refetch: refetchGetLuckyChestUserInfo,
    data,
  } = useQuery(GET_LUCKY_CHEST_USER_INFO, {
    variables: {
      game_platform_id: game_platform_id,
      tier: tier,
      page: page,
      limit: limit,
    },
    skip: !game_platform_id || !tier,
    context: {
      endpoint: 'p2e'
    },
    fetchPolicy: "no-cache"
  })

  return {
    getLuckyChestUserInfoLoading,
    getLuckyChestUserInfoError,
    refetchGetLuckyChestUserInfo,
    dataLuckyChestUserInfo: data?.getLuckyChestUserInfo,
  }
}

export const useClaimChestPrize = (): {
  claimChestPrize: ({user_prize_history_uid, address, onCompleted, onError}: ClaimChestPrizeProps) => Promise<any>
} => {
  const client = useApolloClient()
  const claimChestPrize = async ({user_prize_history_uid, address, onCompleted, onError}: ClaimChestPrizeProps) => {
    try {
      const result = await client.mutate({
        mutation: CLAIM_CHEST_PRIZE,
        variables: {
          user_prize_history_uid: user_prize_history_uid,
          address: address
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
  query($game_platform_id: Int, $tier: LuckyChestTier!) {
    getChestDetail(game_platform_id: $game_platform_id, tier: $tier) {
      id
      title
      desc
      ticket_cost
      ticket_cost_type
      created_at
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
        amount_of_currency
        quantity_in_stock
        valued_at
        img
        rarity
        user_prize_history {
          uid
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
  query($game_platform_id: Int, $tier: LuckyChestTier!, $page: Int, $limit: Int) {
    getLuckyChestUserInfo(game_platform_id: $game_platform_id, tier: $tier, page: $page ,limit: $limit) {
      history_count
      history {
        uid
        code
        tier
        prize_id
        prize {
          id
          title
          desc
          img
          rarity
          amount_of_currency
          created_at
          category {
            prize_type
            currency_uid
            currency_type
          }  
        }
        is_claimed
        created_at
      }
    }
  }
`

export const OPEN_CHEST = gql`
  mutation ($game_platform_id: Int, $tier: LuckyChestTier!) {
    openChest (game_platform_id: $game_platform_id, tier: $tier)
  }
`

const CLAIM_CHEST_PRIZE = gql`
  mutation($user_prize_history_uid: String!, $address: String) {
    claimChestPrize(user_prize_history_uid: $user_prize_history_uid, address: $address)
  }
`