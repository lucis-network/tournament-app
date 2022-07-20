import { ApolloClient, DefaultOptions, gql } from "@apollo/client";
import apoloClient, {
  setAuthToken as ApoloClient_setAuthToken,
} from "utils/apollo_client";
class UtmService {

  public async setUtm(user_id?: number, raw_uri?: string) {
    const response = await apoloClient.mutate({
      mutation: gql`
        mutation ($user_id: Float, $raw_uri: String!){
          setUtm(user_id: $user_id, raw_uri: $raw_uri)
        }
      `,
      context: {
        endpoint: 'p2e'
      },
      variables: {
        user_id: user_id,
        raw_uri: raw_uri
      }
    });

    return response;
  }
}

export default new UtmService();