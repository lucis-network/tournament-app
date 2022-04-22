import { gql } from "@apollo/client";

import AuthStore, { AuthUser } from "./AuthStore";
import apoloClient, {
  setAuthToken as ApoloClient_setAuthToken,
} from "utils/apollo_client";
import {
  clearLocalAuthInfo,
  getLocalAuthInfo,
  setLocalAuthInfo,
} from "./AuthLocal";

export enum AuthError {
  Unknown = "Unknown",
  UserDeniedMsgSignature = "UserDeniedMsgSignature",
}

type LoginResponse = {
  error: AuthError | null;
};

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, time);
  });
}

export default class AuthService {
  async fetchUserData(): Promise<AuthUser> {
    const res = await apoloClient.mutate({
      mutation: gql`
        query {
          me {
            id
            address
            code
            email
            profile {
              full_name
              twitter
              facebook
              discord
              telegram
              phone
              avatar
            }
          }
        }
      `,
      variables: {},
    });

    // .req({
    //   method: 'GET',
    //   url: '/user/get',
    // })
    const u = res.data.me;
    const user: AuthUser = {
      id: u.id,
      code: u.code,
      email: u.email,
      role: u.role,
      name: u.name,
      ref_code: u.ref_code,
      google_id: u.google_id,
      status: u.status,
      profile: u.profile,
    };

    return user;
  }

  private async loginByGoogle(token: string): Promise<AuthUser> {
    const loginRes = await apoloClient.mutate({
      mutation: gql`
        mutation loginGoogle($token: String!) {
          loginGoogle(token: $token) {
            token
            user {
              id
              email
              role
              code
              name
              ref_code
              google_id
              status
              profile {
                user_id
                given_name
                family_name
                phone
                avatar
                cover
              }
            }
          }
        }
      `,
      variables: {
        token,
      },
    });

    const u = loginRes.data.loginGoogle.user;
    console.log("u", loginRes.data.loginGoogle);
    const tokenID = loginRes.data.loginGoogle.token;
    const user: AuthUser = {
      id: u.id,
      token: tokenID,
      code: u.code,
      email: u.email,
      role: u.role,
      name: u.name,
      ref_code: u.ref_code,
      google_id: u.google_id,
      status: u.status,
      profile: u.profile,
    };

    return user;
  }

  private async loginByFacebook(accessToken: string): Promise<AuthUser> {
    const loginRes = await apoloClient.mutate({
      mutation: gql`
        mutation loginFacebook($accessToken: String!) {
          loginFacebook(accessToken: $accessToken) {
            token
            user {
              id
              email
              role
              code
              name
              ref_code
              google_id
              status
              profile {
                user_id
                given_name
                family_name
                phone
                avatar
                cover
              }
            }
          }
        }
      `,
      variables: {
        accessToken,
      },
    });

    const u = loginRes.data.loginFacebook.user;
    const tokenID = loginRes.data.loginFacebook.token;
    const user: AuthUser = {
      id: u.id,
      token: tokenID,
      code: u.code,
      email: u.email,
      role: u.role,
      name: u.name,
      ref_code: u.ref_code,
      facebook_id: u.facebook_id,
      status: u.status,
      profile: u.profile,
    };

    return user;
  }

  /**
   *
   * @param address
   * @param delay Delay some duration before make change to the AuthStore,
   *              useful when you wanna show success for some secs before unmount the components
   */

  async login(
    tokenId: string,
    delay = 1000,
    type?: string
  ): Promise<LoginResponse> {
    let res: LoginResponse = {
      error: null,
    };

    try {
      let user: any;
      if (type === "google") {
        user = await this.loginByGoogle(tokenId);
      }

      if (type === "facebook") {
        user = await this.loginByFacebook(tokenId);
      }

      console.log("{AuthService.login} new-login user: ", user);
      user.token && ApoloClient_setAuthToken(user.token);
      setLocalAuthInfo(user);
      if (!delay) {
        AuthStore.setAuthUser(user);
      } else {
        setTimeout(() => {
          AuthStore.setAuthUser(user);
        }, delay);
      }

      return res;
    } catch (e) {
      console.error("{login} e: ", e);

      /*
       Graphql error
       */

      res.error = AuthError.Unknown;
      return res;
    }
  }

  logout() {
    ApoloClient_setAuthToken("");
    AuthStore.resetStates();
    clearLocalAuthInfo();
  }
}
