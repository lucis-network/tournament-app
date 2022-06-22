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
export default observer(function P2EOverview() {
  const [faceitLogin, setFaceitLogin] = useState({
    login: () => { }
  })
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const { refetchPlatformAccount } = useGetPlatformAccount()

  const [loadingFaceit, setLoadingFaceit] = useState<boolean>(true);
  const [faceitUser, setFaceitUser] = useState<PlatformAccount>({} as PlatformAccount)
  const { getPlatformAccountData, getPlatformAccountLoading } = useGetPlatformAccount()
  const router = useRouter();
  const [connectFaceit, fetch] = useMutation(CONNECT_FACEIT, {
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
    handleRefetchPlatformAccount();
  }, [AuthStore.isLoggedIn])

  const handleRefetchPlatformAccount = async () => {
    try {
      const a = await refetchPlatformAccount();
      setFaceitUser(a.data?.getPlatformAccount[0]);
      setIsAuth(true);
    } catch (error) {
      // TODO
      setFaceitUser({} as any);
      setIsAuth(false);
    }

  }

  const handleConnectFaceit = () => {
    if (!isAuth) {
      LoginBoxStore.connectModalVisible = true;
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
        const tokenData = {
          accessToken: newHashData.get('token'),
          idToken: newHashData.get('id_token')
        }
        try {
          const response = await connectFaceit({
            variables: tokenData
          })
          if (isSubscribed) {
            history.replaceState(null, '', ' ')
            setFaceitUser(response.data.connectFaceit)
            router.push("/p2e/dashboard");
          }
          setLoadingFaceit(false);
        } catch (e) {
          if (isSubscribed) {
            history.replaceState(null, '', ' ')
            if (fetch.error?.graphQLErrors[0].extensions.code === "ALREADY_CONNECTED") {
              message.error("This account is already connected to another user! Please use another account.")
            } else {
              message.error("Something was wrong. Please contact to lucis network for assistance.")
            }
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

  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) {
      setFaceitUser(getPlatformAccountData?.getPlatformAccount[0])
      if (!getPlatformAccountLoading) {
        setLoadingFaceit(false);
      }
    }
    return () => {
      isSubscribed = false
    }
  }, [getPlatformAccountData?.getPlatformAccount, getPlatformAccountLoading])


  // const loginWithSteam = () => {
  //   steam.resolve("https://steamcommunity.com/id/IMAPOORKID").then((id: string) => {
  //     console.log(id); // 76561198146931523
  //   });
  // };

  return (
    <div className="lucis-container-2">
      <div className={s.overviewContainer}>
        <div className={s.overviewSection}>
          <h2 className={s.overviewSectionTitle}>Choose game</h2>
          <Row>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <div className={s.gameItem}>
                <div className={s.gameImage}>
                  <Image
                    src="/assets/P2E/lol-cover.jpg"
                    preview={false}
                    alt=""
                    className={s.gameCover}
                  />
                  <Image
                    src="/assets/P2E/lol-logo.webp"
                    preview={false}
                    alt=""
                    className={s.gameLogo}
                  />
                </div>
                <div className={s.gameName}>
                  <h3>League of Legends</h3>
                  <Button className={s.btnConnectLol} disabled>Connect game</Button>
                </div>
              </div>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <div className={s.gameItem}>
                <div className={s.gameImage}>
                  <Image
                    src="/assets/P2E/csgo-cover.webp"
                    preview={false}
                    alt=""
                    className={s.gameCover}
                  />
                  <Image
                    src="/assets/P2E/csgo-logo.webp"
                    preview={false}
                    alt=""
                    className={s.gameLogo}
                  />
                </div>
                <div className={s.gameName}>
                  <h3>CS:GO FACEIT</h3>
                  {isEmpty(faceitUser) ? (
                    <>
                      {/*<div id="faceitLogin" className={s.btnConnectGame}></div>*/}
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
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
)
