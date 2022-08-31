import { gql } from "@apollo/client";
import apoloClient, { clientP2E } from "utils/apollo_client";
export class RealtimeService {
  private readonly _userId: number;

  constructor(userId:number) {
    this._userId = userId;
  }
  public async subscriptionP2e() {
      const response = await clientP2E.subscribe<{ pushNotification: any }>({
          query: gql`
              subscription ($user_id: Int!){
                  pushNotification(user_id: $user_id) {
                      new_noti {
                          id
                          user_id
                          title
                          image
                          is_seen
                          content,
                          link,
                          created_at
                      }
                      unseen_count
                      
                  }
              }
          `,
        variables: {
          user_id: Number(this._userId)
        },
      });

    return response;
  }

  public async subscriptionArena() {
      const response = await apoloClient.subscribe<{ pushNotification: any }>({
          query: gql`
              subscription ($user_id: Int!){
                  pushNotification(user_id: $user_id) {
                      new_noti {
                          id
                          user_id
                          title
                          image
                          is_seen
                          content,
                          link,
                          created_at
                      }
                      unseen_count

                  }
              }
          `,
          variables: {
            user_id: Number(this._userId)
          },

      });

    return response;
  }


}
