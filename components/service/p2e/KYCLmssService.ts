import { ApolloClient, DefaultOptions, gql } from "@apollo/client";
import { PlatformAccountDto } from "src/generated/graphql_p2e";
import apoloClient, {
  setAuthToken as ApoloClient_setAuthToken,
} from "utils/apollo_client";
class KYCLmssService {


  public async searchBySummonerName(name: string) {
    const response = await apoloClient.query({
      query: gql`
        query ($name: String!) {
          searchBySummonerName(name: $name) {
            avatar
            nick_name
            connected_user_name
            connected_display_name
          }
        }
      `,
      context: {
        endpoint: 'p2e'
      },
      variables: {
        name
      }

    });

    return response;
  }


  public async generateToken() {
    const response = await apoloClient.query({
      query: gql`
        query{
          generateToken
        }
      `,
      context: {
        endpoint: 'p2e'
      }
    });

    return response;
  }

  public async kycAccount(summonerName: string) {
    const response = await apoloClient.mutate<{kycAccount: PlatformAccountDto}>({
      mutation: gql`
        mutation ($summoner_name: String!){
            kycAccount(summoner_name: $summoner_name) {
              player_uid
              avatar
              nick_name
              country_code
              platform_id
              created_at
            }
          }
        `,
      context: {
        endpoint: 'p2e'
      },
      variables: {
        summoner_name: summonerName
      }
    });

    return response;
  }
}

export default new KYCLmssService();