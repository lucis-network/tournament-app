import { gql } from "@apollo/client";
import { PlayerMission } from "src/generated/graphql";
import { CsgoPlayerMatch, GCsgoMatch, LolMatchGql } from "src/generated/graphql_p2e";
import apoloClient from "utils/apollo_client";
class MissionService {

  private game_uid: string ="03";
  private platform_id: number = 1;

  public getVariables() {
    return {
      game_uid: this.game_uid,
      platform_id: this.platform_id
    }
  }
  public setVariable(game_uid: string, platform_id: number) {
    this.game_uid = game_uid;
    this.platform_id = platform_id;
  }
  public async getOrSerDailyMission() {
    const response = await apoloClient.mutate<{getOrSetDailyMission: PlayerMission[]}>({
      mutation: gql`
        mutation ($game_uid: String!, $platform_id: Int!) {
          getOrSetDailyMission(game_uid: $game_uid, platform_id: $platform_id) {
            achieved
            uid
            mission_uid
            is_claim
            updated_at
            mission {
              level {
                lucis_point
                level
                lucis_token
              }
              csgo_mission {
                type
                map
              }
              uid
              title
              game_uid
              img
              goal
            }
          }
        }
      `,
      context: {
        endpoint: 'p2e'
      },
      variables: {
        game_uid: this.game_uid,
        platform_id: this.platform_id
      }

    });

    return response;
  }

  public async getCSGORecentMatch(offset: number, limit: number) {
    const response = await apoloClient.query<{getRecentlyCsgoMatch: GCsgoMatch}>({
      query: gql`
        query ($offset: Int!, $limit: Int!, $platform_id: Int!) {
          getRecentlyCsgoMatch(offset: $offset, limit: $limit, platform_id: $platform_id) {
            matches {
              id
              match_uid
              player_game_uid
              is_win
              map_img
              lucis_point
              player_statistic
              match {
                uid
                winner_team
                loser_team
                score
                end_at
                map
              }
            }
            total
          }
        }
      `,
      context: {
        endpoint: 'p2e'
      },
      variables: {
        offset,
        limit,
        platform_id: this.platform_id
      }

    });

    return response;
  }


  public async getLOLRecentMatch(offset: number, limit: number) {
    const response = await apoloClient.query<{getRecentlyLolMatch: LolMatchGql}>({
      query: gql`
        query ($offset: Int!, $limit: Int!, $platform_id: Int!) {
          getRecentlyLolMatch(offset: $offset, limit: $limit, platform_id: $platform_id) {
            matches {
              uid
              match_uid
              player_game_uid
              is_win
              kill
              assist
              map_img
              point
              gold_earned
              minion_killed
              deaths
              match {
                uid
                type
                end_at
                map
              }
            }
            total
          }
        }
      `,
      context: {
        endpoint: 'p2e'
      },
      variables: {
        offset,
        limit,
        platform_id: this.platform_id
      }

    });

    return response;
  }

  public async getLOLMatchStatistic(player_match_id: string) {
    const response = await apoloClient.query({
      query: gql`
        query ($player_match_id: String!) {
          getLolMatchStatistic(player_match_id: $player_match_id) {
              match_uid
              point
              is_win
              kill
              deaths
              assist
              is_most_assist
              most_kill
              eye_placed
              is_most_eye_placed
              eye_killed
              is_most_eye_killed
              double_kill
              triple_kill
              quadra_kill
              pental_kill
              aces
              minion_killed
              is_most_minion_killed
              is_mvp
              damage_taken
              is_most_damage_taken
              damage_dealt
              is_most_damage_dealt
              gold_earned
              is_most_gold_earned
              player_statistic
              match {
                end_at
                map
                type
                score
              }
          }
        }
      `,
      context: {
        endpoint: 'p2e'
      },
      variables: {
        player_match_id
      }

    });

    return response;
  }

  public async getCSGOMatchStatistic(player_match_id: number) {
    const response = await apoloClient.query({
      query: gql`
        query ($player_match_id: Int!) {
          getCsgoMatchStatistic(player_match_id: $player_match_id) {
              match_uid,
              match_earning {
                id,
                win,
                kill,
                assist,
                most_kill,
                mvp,
                most_support,
                triple_kill,
                quadra_kill,
                pental_kill,
                headshot,
                most_headshot,
                least_died,
                highest_kda,
                highest_kr
              }
              map {
                name, 
                img_lg,
                img_sm
              }
              score,
              is_win,
              most_support,
              most_headshot,
              least_died,
              highest_kda,
              highest_kr,
              current_win_streak,
              player_statistic,
              end_at,
              most_kill,
              point
          }
        }
      `,
      context: {
        endpoint: 'p2e'
      },
      variables: {
        player_match_id
      }

    });

    return response;
  }

  public async getLucisMission() {
    const response = await apoloClient.query({
      query: gql`
        query ($game_uid: String!, $platform_id: Int!) {
          getLucisMission(game_uid: $game_uid, platform_id: $platform_id) {
            achieved
            uid
            mission_uid
            is_claim
            updated_at
            mission {
              level {
                lucis_point
                level
                lucis_token
              }
              uid
              title
              game_uid
              img
              goal
            }
          }
        }
      `,
      context: {
        endpoint: 'p2e'
      },
      variables: {
        game_uid: this.game_uid,
        platform_id: this.platform_id
      }

    });

    return response;
  }


  public async updateDailyMission() {
    const response = await apoloClient.mutate<{updateDailyMission: PlayerMission[]}>({
      mutation: gql`
        mutation ($game_uid: String!, $platform_id: Int!) {
          updateDailyMission(game_uid: $game_uid, platform_id: $platform_id) {
            achieved
            uid
            updated_at 
            mission_uid
            mission {
              level {
                lucis_point
                level
                lucis_token
              }
              csgo_mission {
                type
                map
              }
              uid
              title
              game_uid
              img
              goal
            }
            is_claim
          }
        }
      `,
      context: {
        endpoint: 'p2e'
      },
      variables: {
        game_uid: this.game_uid,
        platform_id: this.platform_id
      }

    });

    return response;
  }

  public async updateCSGORecentMatch() {
    const response = await apoloClient.mutate({
      mutation: gql`
        mutation ($platform_id: Int!) {
          updateCsgoRecentlyMatch(platform_id: $platform_id) {
              id
              match_uid
              player_game_uid
              is_win
              map_img
              lucis_point
              player_statistic
              match {
                uid
                winner_team
                loser_team
                score
                end_at
                map
              }
          }
        }
      `,
      context: {
        endpoint: 'p2e'
      },
      variables: {
        platform_id: this.platform_id
      }

    });

    return response;
  }

  public async updateLOLRecentMatch() {
    const response = await apoloClient.mutate({
      mutation: gql`
        mutation ($platform_id: Int!) {
          updateLolRecentlyMatch(platform_id: $platform_id) {
            uid
            match_uid
            player_game_uid
            is_win
            kill
            assist
            map_img
            point
            gold_earned
            minion_killed
            deaths
            match {
              uid
              type
              end_at
              map
            }
          }
        }
      `,
      context: {
        endpoint: 'p2e'
      },
      variables: {
        platform_id: this.platform_id
      }

    });

    return response;
  }

  public async claimMission(player_mission_uid: string) {
    const response = await apoloClient.mutate({
      mutation: gql`
      mutation ($player_mission_uid: String!) {
        claimMission(player_mission_uid: $player_mission_uid)
      }
      `,
      context: {
        endpoint: 'p2e'
      },
      variables: {
        player_mission_uid
      }

    });

    return response;
  }

  public async claimBox() {
    const response = await apoloClient.mutate({
      mutation: gql`
        mutation ($platform_id: Int!, $game_uid: String!) {
          claimBox (platform_id: $platform_id, game_uid: $game_uid) 
        }
      `,
      context: {
        endpoint: 'p2e'
      },
      variables: {
        game_uid: this.game_uid,
        platform_id: this.platform_id
      }

    });

    return response;
  }

  public async isClaimBox() {
    const response = await apoloClient.query<{isClaimBox: boolean}>({
      query: gql`
        query ($game_uid: String!, $platform_id: Int!) {
          isClaimBox(game_uid: $game_uid, platform_id: $platform_id)
        }
      `,
      context: {
        endpoint: 'p2e'
      },
      variables: {
        game_uid: this.game_uid,
        platform_id: this.platform_id
      }

    });

    return response;
  }

}

export default new MissionService();