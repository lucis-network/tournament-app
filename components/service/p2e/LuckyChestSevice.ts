import { gql } from "@apollo/client";
import { PlayerMission } from "src/generated/graphql";
import {ChestDetail, LuckyChestTier, LuckyChestUserInfo} from "src/generated/graphql_p2e";
import apoloClient from "utils/apollo_client";

type GetUserHistoryProps = {
  game_platform_id?: number,
  tier?: string,
  page?: number,
  limit?: number,
}
class LuckyChestService {
  public async getChestDetail(game_platform_id: number | undefined, tier: string) {
      const response = await apoloClient.query<{getChestDetail: ChestDetail}>({
          query: gql`
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
                          prize_amount
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
          `,
        context: {
          endpoint: 'p2e'
        },
        variables: {
          game_platform_id: game_platform_id,
          tier: tier,
        }
      });

    return response;
  }

  public async getLuckyChestUserInfo({game_platform_id, tier, page, limit}: GetUserHistoryProps) {
      const response = await apoloClient.query<{getLuckyChestUserInfo: LuckyChestUserInfo}>({
          query: gql`
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
                              prize_amount
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
          `,
        context: {
          endpoint: 'p2e'
        },
        variables: {
          game_platform_id: game_platform_id,
          tier: tier,
          page: page,
          limit: limit,
        }
      });

    return response;
  }

}

export default new LuckyChestService();