import { ApolloClient, DefaultOptions, gql } from "@apollo/client";
import apoloClient, {
  setAuthToken as ApoloClient_setAuthToken,
} from "utils/apollo_client";
class UtmService {

  public async setUtm(user_id?: number, utm?: string) {
    const response = await apoloClient.mutate({
      mutation: gql`
        mutation ($user_id: Float, $utm: String!){
          setUtm(user_id: $user_id, utm: $utm)
        }
      `,
      context: {
        endpoint: 'p2e'
      },
      variables: {
        user_id: user_id,
        utm: utm
      }
    });

    return response;
  }
}

export default new UtmService();