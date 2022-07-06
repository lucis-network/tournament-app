import React, { useEffect, useState } from 'react'
import s from './P2EOverview.module.sass'
import { Button, Col, Image, message, Row } from "antd";
import { isEmpty } from "lodash";
import { isDevMode } from "../../../../utils/Env";
import { PlatformAccount } from "../../../../src/generated/graphql_p2e";
import AuthStore from "../../../Auth/AuthStore";
import { observer } from 'mobx-react-lite';
import LoginBoxStore from "../../../Auth/Login/LoginBoxStore";
import { CONNECT_FACEIT, CONNECT_LMSS, useGetPlatformAccount } from 'hooks/p2e/useP2E';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { handleGraphqlErrors } from 'utils/apollo_client';
import AuthGameStore, { AuthGameUser } from 'components/Auth/AuthGameStore';
import { getLocalAuthGameInfo, setLocalAuthGameInfo } from 'components/Auth/AuthLocal';
import { ConnectLOLPopup } from './ConnectLOLPopup';
import BannerOverview from './component/banner/BannerOverview';
import { Game } from 'utils/Enum';
export default observer(function P2EOverview() {
  const [faceitLogin, setFaceitLogin] = useState({
    login: () => { }
  })
  const [isAuth, setIsAuth] = React.useState<boolean>(false);

  const [loadingFaceit, setLoadingFaceit] = useState<boolean>(true);
  const [loadingLMSS, setLoadingLMSS] = useState<boolean>(true);
  const [openConnectLOLPopup, setOpenConnectLOLPopup] = useState<boolean>(false);
  const [faceitUser, setFaceitUser] = useState<PlatformAccount>({} as PlatformAccount)
  const [lmssUser, setLmssUser] = useState<PlatformAccount>({} as PlatformAccount)
  const router = useRouter();
  const [connectFaceit] = useMutation(CONNECT_FACEIT, {
    context: {
      endpoint: 'p2e'
    }
  })

  const [connectLMSS] = useMutation(CONNECT_LMSS, {
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
    if (AuthGameStore.isLoggedInFaceit === undefined
      && AuthGameStore.isLoggedInLMSS === undefined
      && AuthStore.isLoggedIn === undefined) {
      setFaceitUser({} as any);
      setLmssUser({} as any);
      setIsAuth(false);
    } else {
      if (AuthGameStore.isLoggedInFaceit === true) {
        const faceitUser = {
          avatar: AuthGameStore.faceit_avatar,
          nick_name: AuthGameStore.faceit_nick_name
        }
        setFaceitUser(faceitUser as any as PlatformAccount);
        setIsAuth(true);

      }
      if (AuthGameStore.isLoggedInLMSS === true) {
        const lmssUser = {
          avatar: AuthGameStore.lmss_avatar,
          nick_name: AuthGameStore.lmss_nick_name
        }
        setLmssUser(lmssUser as any as PlatformAccount);
        setIsAuth(true);
      }

      if (AuthGameStore.isLoggedInFaceit === false && AuthGameStore.isLoggedInLMSS === false && AuthStore.isLoggedIn === true) {
        setIsAuth(true);
        setFaceitUser({} as any);
        setLmssUser({} as any);
      }

      setLoadingFaceit(false);
      setLoadingLMSS(false);
    }


  }, [AuthGameStore.isLoggedInFaceit, AuthStore.isLoggedIn, AuthGameStore.isLoggedInLMSS])



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
              ...AuthGameStore,
              faceit_id: data.player_uid,
              faceit_access_token: accessToken as string,
              faceit_id_token: idToken as string,
              faceit_platform_id: data.platform_id,
              faceit_nick_name: data.nick_name,
              faceit_avatar: data.avatar,
            }

            AuthGameStore.setAuthGameUser(gameAccount);
            localStorage.setItem("currentGame", Game.CSGO.toString());
            setLocalAuthGameInfo(gameAccount);
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

  const connectLOL = async (summonerName: string) => {
    setOpenConnectLOLPopup(false);
    setLoadingLMSS(true);
    try {
      const response = await connectLMSS({
        variables: {
          summoner_name: summonerName
        }
      });

      const data = response.data.connectLmss;
      const gameAccount: AuthGameUser = {
        ...AuthGameStore,
        lmss_id: data.player_uid,
        lmss_access_token: "This is a access token" as string,
        lmss_id_token: "This is a id token" as string,
        lmss_platform_id: data.platform_id,
        lmss_nick_name: data.nick_name,
        lmss_avatar: data.avatar,
      }
      AuthGameStore.setAuthGameUser(gameAccount);
      setLmssUser(data);
      localStorage.setItem("currentGame", Game.LOL.toString());
      setLocalAuthGameInfo(gameAccount);
      router.push("/p2e/dashboard");

    } catch (e: any) {
      handleGraphqlErrors(e, (code) => {
        switch (code) {
          // case "ALREADY_CONNECTED":
          //   message.error("This account is already connected to another user! Please use another account.")
          //   return;
          // case "HAS_NOT_CSGO":
          //   message.error("Your account on Faceit is not connected to CS:GO. Please connect to your game first");
          //   return;
          default:
            message.error("Something was wrong. Please contact to Lucis Network!")
        };
      })
    }
    setLoadingLMSS(false);

  }

  const onClickConnectLMSS = () => {
    if (!isAuth) {
      message.error("Please sign in first!");
      return;
    }

    setOpenConnectLOLPopup(true);
  }

  const prefixAvatar = "https://lmssplus.com/static_image/img/profileicon/";
  return (
    <div className="lucis-container-2">
      {openConnectLOLPopup &&
        <ConnectLOLPopup
          onCancel={() => setOpenConnectLOLPopup(false)}
          onConnectLOL={(summonerName) => connectLOL(summonerName)}
        />}
      <div className={s.overviewContainer}>
        {!AuthStore.isLoggedIn && <BannerOverview />}

        <div className={s.overviewSection}>
          <h2 className={s.overviewSectionTitle}>PLAY YOUR FAVORITE GAME</h2>
          <Row justify='space-between'>
            <Col className={s.bg_item} style={{ backgroundImage: 'url(/assets/P2E/overview/bg_lol.png)' }}>
              <Row align='middle' className={s.block_game}>
                <Col className={s.img_game}>
                  <img src="/assets/P2E/overview/im_lol.png" alt="" />
                </Col>
                <Col className={s.content}>
                  <h1>LEAGUE OF LEGENDS</h1>
                  {isEmpty(lmssUser) ? (
                    <Button
                      className={s.btnConnectLol}
                      onClick={() => onClickConnectLMSS()}
                      disabled={loadingLMSS}>Connect game</Button>
                  ) : (
                    <div className={s.platformUser}>
                      <Image src={lmssUser?.avatar ? `${prefixAvatar}${lmssUser?.avatar}` : "/assets/avatar.jpg"} preview={false} alt="" className={s.platformUserAvatar} />
                      <div className={s.platformUserName}>{lmssUser?.nick_name}</div>
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
            <Col className={s.bg_item} style={{ backgroundImage: 'url(/assets/P2E/overview/bg_cs.png)' }}>
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
