import { gql } from "@apollo/client";

import AuthStore, { AuthUser } from "./AuthStore";
import apoloClient, {
  setAuthToken as ApoloClient_setAuthToken,
} from "utils/apollo_client";
import {
  clearLocalAuthInfo,
  getLocalAuthInfo,
  setLocalAuthGameInfo,
  setLocalAuthInfo,
} from "./AuthLocal";
import LoginBoxStore from "../Auth/Login/LoginBoxStore";
import { nonReactive as ConnectWalletStore_NonReactiveData } from "./ConnectWalletStore";
import AuthGameStore, { AuthGameUser } from "./AuthGameStore";
import { Platform } from "utils/Enum";
import { PlatformAccount } from "src/generated/graphql_p2e";

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
            favorite_game {
              id
              user_id
              game_uid
              enable_favorite
              game {
                uid
                name
                logo
                desc
              }
              user {
                id
              }
            }
            profile {
              full_name
              twitter
              facebook
              discord
              telegram
              twitch
              phone
              avatar
              user_name
              country_code
              display_name
              biography
              cover
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

  private async loginByGoogle(token: string): Promise<{ user: AuthUser, gameAccount: AuthGameUser }> {
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
              ref_code
              google_id
              status
              facebook_id
              favorite_game {
                id
                user_id
                game_uid
                enable_favorite
                game {
                  uid
                  name
                  logo
                  desc
                }
                user {
                  id
                }
              }
              profile {
                user_id
                given_name
                family_name
                phone
                avatar
                cover
                user_name
                country_code
                twitter
                facebook
                discord
                telegram
                twitch
                user_name
                display_name
                biography
                cover
              }

              platform_account {
                uid
                access_token
                id_token
                platform_id
                nick_name
                avatar
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
    const platformAccounts = loginRes.data?.loginGoogle?.user?.platform_account;
    // console.log(platformAccounts)
    const tokenID = loginRes.data.loginGoogle.token;
    const user: AuthUser = {
      id: u.id,
      token: tokenID,
      code: u.code,
      email: u.email,
      role: u.role,
      name: u.name ?? u.profile.given_name + " " + u.profile.family_name,
      ref_code: u.ref_code,
      google_id: u.google_id,
      status: u.status,
      profile: u.profile,
    };

    let gameAccount: AuthGameUser = {
      // faceit_id: item?.uid,
      // faceit_access_token: item?.access_token,
      // faceit_id_token: item?.id_token,
      // faceit_platform_id: item?.platform_id,
      // faceit_nick_name: item?.nick_name,
      // faceit_avatar: item?.avatar,
    }

    platformAccounts.forEach((item: any) => {
      switch (item.platform_id) {
        case Platform.FACEIT:
          gameAccount = {
            ...gameAccount,
            faceit_id: item?.uid,
            faceit_access_token: item?.access_token,
            faceit_id_token: item?.id_token,
            faceit_platform_id: item?.platform_id,
            faceit_nick_name: item?.nick_name,
            faceit_avatar: item?.avatar,
          }
          break;
          case Platform.GARENA:
            gameAccount = {
              ...gameAccount,
              lmss_id: item?.uid,
              lmss_access_token: "item?.access_token",
              lmss_id_token: "item?.id_token",
              lmss_platform_id: item?.platform_id,
              lmss_nick_name: item?.nick_name,
              lmss_avatar: item?.avatar,
            }
            break;

        default:
          break;
      }
    })

    return {
      user,
      gameAccount: gameAccount
    };
  }

  private async loginByFacebook(accessToken: string): Promise<{ user: AuthUser, gameAccount: AuthGameUser }> {
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
              ref_code
              google_id
              status
              facebook_id
              favorite_game {
                id
                user_id
                game_uid
                enable_favorite
                game {
                  uid
                  name
                  logo
                  desc
                }
                user {
                  id
                }
              }
              profile {
                user_id
                given_name
                family_name
                phone
                avatar
                cover
                user_name
                country_code
                twitter
                facebook
                discord
                telegram
                twitch
                user_name
                display_name
                biography
                cover
              }

              platform_account {
                uid
                access_token
                id_token
                platform_id
                nick_name
                avatar
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
    const platformAccounts = loginRes.data.loginFacebook?.user?.platform_account;
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

    let gameAccount: AuthGameUser = {
      // faceit_id: item?.uid,
      // faceit_access_token: item?.access_token,
      // faceit_id_token: item?.id_token,
      // faceit_platform_id: item?.platform_id,
      // faceit_nick_name: item?.nick_name,
      // faceit_avatar: item?.avatar,
    }

    platformAccounts.forEach((item: any) => {
      switch (item.platform_id) {
        case Platform.FACEIT:
          gameAccount = {
            ...gameAccount,
            faceit_id: item?.uid,
            faceit_access_token: item?.access_token,
            faceit_id_token: item?.id_token,
            faceit_platform_id: item?.platform_id,
            faceit_nick_name: item?.nick_name,
            faceit_avatar: item?.avatar,
          }
          break;
          case Platform.GARENA:
            gameAccount = {
              ...gameAccount,
              lmss_id: item?.uid,
              lmss_access_token: "item?.access_token",
              lmss_id_token: "item?.id_token",
              lmss_platform_id: item?.platform_id,
              lmss_nick_name: item?.nick_name,
              lmss_avatar: item?.avatar,
            }
            break;

        default:
          break;
      }

    })

    return {
      user,
      gameAccount: gameAccount
    };
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
      let data: { user: AuthUser, gameAccount: AuthGameUser } = {
        user: {
          id: undefined,
          code: undefined,
          token: undefined,
          email: undefined,
          facebook_id: undefined,
          google_id: undefined,
          name: undefined,
          profile: undefined,
          ref_code: undefined,
          role: undefined,
          status: undefined,
          updated_at: undefined,
          favorite_game: undefined
        },
        gameAccount: {
          faceit_id: undefined,
          faceit_access_token: undefined,
          faceit_id_token: undefined,
          faceit_platform_id: undefined,
          faceit_nick_name: undefined,
          faceit_avatar: undefined
        }
      };
      if (type === "google") {
        data = await this.loginByGoogle(tokenId);
      }

      if (type === "facebook") {
        data = await this.loginByFacebook(tokenId);
      }

      console.log("{AuthService.login} new-login user: ", data);
      data.user.token && ApoloClient_setAuthToken(data.user.token);
      setLocalAuthInfo(data.user);
      setLocalAuthGameInfo(data.gameAccount);
      if (!delay) {
        AuthStore.setAuthUser(data.user);
        AuthGameStore.setAuthGameUser(data.gameAccount)
      } else {
        setTimeout(() => {
          AuthStore.setAuthUser(data.user);
          AuthGameStore.setAuthGameUser(data.gameAccount)
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

  sign(params: any) {
    return new Promise<string | undefined>(async (resolve, reject) => {
      try {
        const web3Provider = ConnectWalletStore_NonReactiveData.web3Provider;

        let timer = setTimeout(() => {
          reject("Request timeout");
        }, 30000);
        const signed_hash = await web3Provider!.send("personal_sign", params);
        resolve(signed_hash);
      } catch (err) {
        reject(err);
      }
    });
  }

  logout() {
    ApoloClient_setAuthToken("");
    AuthStore.resetStates();
    AuthGameStore.resetStates();
    clearLocalAuthInfo();
    //Router.push("/");
    LoginBoxStore.signupInfoModalVisible = false;
  }
}
