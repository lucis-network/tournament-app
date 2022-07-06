import React, { useEffect, useState } from 'react'
import s from './P2EOverview.module.sass'
import { Button, Col, Image, message, Row } from "antd";
import { isEmpty } from "lodash";
import { isDevMode } from "../../../../utils/Env";
import { PlatformAccount } from "../../../../src/generated/graphql_p2e";
import AuthStore from "../../../Auth/AuthStore";
import { observer } from 'mobx-react-lite';
import LoginBoxStore from "../../../Auth/Login/LoginBoxStore";
import { CONNECT_FACEIT, useGetPlatformAccount } from 'hooks/p2e/useP2E';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { handleGraphqlErrors } from 'utils/apollo_client';
import AuthGameStore, { AuthGameUser } from 'components/Auth/AuthGameStore';
import { getLocalAuthGameInfo } from 'components/Auth/AuthLocal';
import BannerOverview from './component/banner/BannerOverview';
export default observer(function P2EOverview() {
  const [faceitLogin, setFaceitLogin] = useState({
    login: () => { }
  })
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  // const { refetchPlatformAccount } = useGetPlatformAccount(false);
  const [loadingFaceit, setLoadingFaceit] = useState<boolean>(true);
  const [faceitUser, setFaceitUser] = useState<PlatformAccount>({} as PlatformAccount)
  const router = useRouter();
  const [connectFaceit] = useMutation(CONNECT_FACEIT, {
    context: {
      endpoint: 'p2e'
    }
  })
  const fetchJsFromCDN = (src: string, externals: any[] = []) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.setAttribute("src", src);
      script.addEventListener("load", () => {
        resolve(
          externals.map((key) => {
            const ext = window[key];
            typeof ext === "undefined" &&
              console.warn(`No external named '${key}' in window`);
            return ext;
          })
        );
      });
      script.addEventListener("error", reject);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    if (isEmpty(faceitUser)) {
      fetchJsFromCDN(
        "https://cdn.faceit.com/oauth/faceit-oauth-sdk-1.2.7.min.js",
        ["FACEIT"]
      ).then(([FACEIT]: any) => {
        function callback(response: any) {
          if (response.isIdTokenValid === true) {
            return;
          }
          alert("The id token is not valid, something went wrong");
        }
        const initParams = {
          client_id: isDevMode
            ? process.env.NEXT_PUBLIC_FACEIT_CLIENT_ID_DEV
            : process.env.NEXT_PUBLIC_FACEIT_CLIENT_ID_TEST,
          response_type: "token",
        };
        FACEIT.init(initParams, callback);
        setFaceitLogin({
          login: FACEIT.loginWithFaceit,
        });
      });
    }
  }, [faceitUser])

  useEffect(() => {

    if (AuthGameStore.isLoggedInFaceit === true) {
      setIsAuth(false);

      const faceitUser = {
        avatar: AuthGameStore.faceit_avatar,
        nick_name: AuthGameStore.faceit_nick_name
      }
      setFaceitUser(faceitUser as any as PlatformAccount);

    } else if (AuthGameStore.isLoggedInFaceit === false && AuthStore.isLoggedIn === true) {

      setIsAuth(true);
      setFaceitUser({} as any);
    } else {
      setFaceitUser({} as any);
      setIsAuth(false);
    }

    setLoadingFaceit(false);
  }, [AuthGameStore.isLoggedInFaceit, AuthStore.isLoggedIn])



  const handleConnectFaceit = () => {
    if (!isAuth) {
      message.error("Please sign in first!");
      return;
    }

    faceitLogin.login();
  }



  useEffect(() => {
    let isSubscribed = true
    const handleHashChange = async () => {
      setLoadingFaceit(true);
      let hashData = window.location.hash
      if (hashData.startsWith('#token=') && hashData.includes('id_token')) {
        const newHashData = new URLSearchParams(hashData.replace('#token=', '?token='))
        const accessToken = newHashData.get('token');
        const idToken = newHashData.get('id_token');
        const tokenData = {
          accessToken,
          idToken
        }
        try {
          const response = await connectFaceit({
            variables: tokenData
          })
          if (isSubscribed) {
            history.replaceState(null, '', ' ')
            setFaceitUser(response.data.connectFaceit)
            const data = response.data.connectFaceit;
            const gameAccount: AuthGameUser = {
              faceit_id: data.player_uid,
              faceit_access_token: accessToken as string,
              faceit_id_token: idToken as string,
              faceit_platform_id: data.platform_id,
              faceit_nick_name: data.nick_name,
              faceit_avatar: data.avatar,
            }

            AuthGameStore.setAuthGameUser(gameAccount);
            router.push("/p2e/dashboard");
          }
          setLoadingFaceit(false);
        } catch (e: any) {
          if (isSubscribed) {
            history.replaceState(null, '', ' ')

            handleGraphqlErrors(e, (code) => {
              switch (code) {
                case "ALREADY_CONNECTED":
                  message.error("This account is already connected to another user! Please use another account.")
                  return;
                case "HAS_NOT_CSGO":
                  message.error("Your account on Faceit is not connected to CS:GO. Please connect to your game first");
                  return;
                default:
                  message.error("Something was wrong. Please contact to Lucis Network!")
              };
            })
          }
          setLoadingFaceit(false);
        }


      }
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      isSubscribed = false
    }
  }, [])


  // const loginWithSteam = () => {
  //   steam.resolve("https://steamcommunity.com/id/IMAPOORKID").then((id: string) => {
  //     console.log(id); // 76561198146931523
  //   });
  // };

  return (
    <div className="lucis-container-2">

      <div className={s.overviewContainer}>
        <BannerOverview />

        <div className={s.overviewSection}>
          <h2 className={s.overviewSectionTitle}>PLAY YOUR FAVORITE GAME</h2>
          <Row justify='space-between'>
            <Col className={s.bg_item} style={{backgroundImage:'url(/assets/P2E/overview/bg_lol.png)'}}>
              <Row align='middle' className={s.block_game}>
                <Col className={s.img_game}>
                  <img src="/assets/P2E/overview/im_lol.png" alt="" />
                </Col>
                <Col className={s.content}>
                  <h1>LEAGUE OF LEGENDS</h1>
                  <Button className={s.btnConnectLol} disabled>Connect game</Button>
                </Col>
              </Row>
            </Col>
            <Col className={s.bg_item} style={{backgroundImage:'url(/assets/P2E/overview/bg_cs.png)'}}>
              <Row align='middle' className={s.block_game}>
                <Col className={s.img_game}>
                  <img src="/assets/P2E/overview/im_cs.png" alt="" />
                </Col>
                <Col className={s.content}>
                  <h1>CS:GO</h1>
                  {isEmpty(faceitUser) ? (
                    <>
                      {/* <div id="faceitLogin" className={s.btnConnectGame}></div> */}
                      <Button
                        onClick={() => handleConnectFaceit()}
                        className={s.btnLoginFaceit}
                        loading={loadingFaceit}
                      >CONNECT WITH FACEIT</Button>
                    </>
                  ) : (
                    <div className={s.platformUser}>
                      <Image src={faceitUser?.avatar ? faceitUser?.avatar : "/assets/avatar.jpg"} preview={false} alt="" className={s.platformUserAvatar} />
                      <div className={s.platformUserName}>{faceitUser?.nick_name}</div>
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
)
