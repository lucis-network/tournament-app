import { ApolloClient, DefaultOptions, gql } from "@apollo/client";
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
    const response = await apoloClient.query({
      query: gql`
        query ($summoner_name: String!){
          KycAccount(summoner_name: $summoner_name)
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