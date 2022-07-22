import React, { useEffect, useState } from 'react'
import s from './P2EOverview.module.sass'
import {Button, Col, Image, message, Modal, Row, Spin} from "antd";
import { isEmpty } from "lodash";
import { isDevMode } from "../../../../utils/Env";
import { PlatformAccount } from "../../../../src/generated/graphql_p2e";
import AuthStore from "../../../Auth/AuthStore";
import { observer } from 'mobx-react-lite';
import LoginBoxStore from "../../../Auth/Login/LoginBoxStore";
import { CONNECT_FACEIT, CONNECT_LMSS, GET_NUMBER_CONNECTED_USER, useGetPlatformAccount } from 'hooks/p2e/useP2E';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { handleGraphqlErrors } from 'utils/apollo_client';
import AuthGameStore, { AuthGameUser, AuthLMSSGameUser } from 'components/Auth/AuthGameStore';
import { setLocalAuthGameInfo } from 'components/Auth/AuthLocal';
import { ConnectLOLPopup } from './ConnectLOLPopup';
import BannerOverview from './component/banner/BannerOverview';
import { Game, OverviewSection, Platform } from 'utils/Enum';
import moment from "moment";

interface IProps {
  overviewSection?: OverviewSection;
  resetOverviewSection?: () => void;
}
export default observer(function P2EOverview(props: IProps) {
  const connectGameRef = React.useRef<HTMLDivElement>();
  const [faceitLogin, setFaceitLogin] = useState({
    login: () => { }
  })
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const [campaignModalVisible, setCampaignModalVisible] = useState(false)
  const [loadingFaceit, setLoadingFaceit] = useState<boolean>(false);
  const [loadingLMSS, setLoadingLMSS] = useState<boolean>(false);
  const [openConnectLOLPopup, setOpenConnectLOLPopup] = useState<boolean>(false);
  const [faceitUser, setFaceitUser] = useState<PlatformAccount>({} as PlatformAccount)
  const [lmssUser, setLmssUser] = useState<PlatformAccount>({} as PlatformAccount)
  const router = useRouter();
  const [connectFaceit] = useMutation(CONNECT_FACEIT, {
    context: {
      endpoint: 'p2e'
    }
  })

  const connectedUserQuery = useQuery(GET_NUMBER_CONNECTED_USER, {
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
            : process.env.NEXT_PUBLIC_FACEIT_CLIENT_ID_BUILD,
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
      setLoadingFaceit(false);
      setLoadingLMSS(false);
    } else {
      if (AuthStore.isLoggedIn === true) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }

      if (AuthGameStore.isLoggedInFaceit === true) {
        const faceitUser = {
          avatar: AuthGameStore.faceit_avatar,
          nick_name: AuthGameStore.faceit_nick_name
        }
        setFaceitUser(faceitUser as any as PlatformAccount);

      } else {
        setFaceitUser({} as any);
      }
      if (AuthGameStore.isLoggedInLMSS === true) {
        const lmssUser = {
          avatar: AuthGameStore.lmss_avatar,
          nick_name: AuthGameStore.lmss_nick_name
        }
        setLmssUser(lmssUser as any as PlatformAccount);
      } else {
        setLmssUser({} as any);
      }

      setLoadingFaceit(false);
      setLoadingLMSS(false);
    }


  }, [AuthGameStore.isLoggedInFaceit, AuthStore.isLoggedIn, AuthGameStore.isLoggedInLMSS])



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
            router.push("/playcore/dashboard");
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

  useEffect(() => {
    if (props.overviewSection && props.overviewSection === OverviewSection.CONNECT_GAME) {
      connectGameRef.current?.scrollIntoView();
      if (props.resetOverviewSection) {
        props.resetOverviewSection();
      }
    }
  }, [props.overviewSection])


  // const loginWithSteam = () => {
  //   steam.resolve("https://steamcommunity.com/id/IMAPOORKID").then((id: string) => {
  //     console.log(id); // 76561198146931523
  //   });
  // };

  const connectedUserLOL = connectedUserQuery?.data?.getNumberConnectedUser?.filter((item: any) => item.game === "League of Legends" && item.platform === "GARENA")[0]?.number_user;
  const connectedUserCSGO = connectedUserQuery?.data?.getNumberConnectedUser?.filter((item: any) => item.game === "CS:GO" && item.platform === "FACEIT")[0]?.number_user;


  const connectLOL = async (data: AuthLMSSGameUser) => {
    setOpenConnectLOLPopup(false);
    setLoadingLMSS(true);

    const gameAccount: AuthGameUser = {
      ...AuthGameStore,
      ...data
    }
    AuthGameStore.setAuthGameUser(gameAccount);
    setLmssUser({ ...lmssUser, avatar: data.lmss_avatar, nick_name: data.lmss_nick_name });
    localStorage.setItem("currentGame", Game.LOL.toString());
    setLocalAuthGameInfo(gameAccount);
    router.push("/playcore/dashboard");

    setLoadingLMSS(false);

  }

  const onClickConnectLMSS = () => {
    if (!isAuth) {
      LoginBoxStore.connectModalVisible = true;
      return;
    }

    setOpenConnectLOLPopup(true);
  }

  const prefixAvatar = "https://lmssplus.com/static_image/img/profileicon/";

  // marketing banner
  const handleCampaignModalCancel = () => {
    setCampaignModalVisible(false)
  }
  const handleCampaignModalDontShowAgain = () => {
    localStorage.setItem('dontShowAgain', 'true')
    setCampaignModalVisible(false)
  }
  const handleCampaignModalSignup = () => {
    LoginBoxStore.connectModalVisible = true
  }
  useEffect(() => {
    if (!AuthStore.isLoggedIn) {
      const isCampaignStart = () => {
        const now = moment.utc().unix()
        const startDate = moment('2022-07-22T00:00:00Z').utc().unix()
        const endDate = moment('2022-07-29T00:00:00Z').utc().unix()
        return moment(now).isBetween(startDate, endDate)
      }
      if (isCampaignStart() && (localStorage.getItem('dontShowAgain') !== 'true')) {
        setCampaignModalVisible(true)
      }
    }
  }, [])
  // end marketing banner

  return (
    <div className={s.background}>
      <div className="lucis-container-2">
        {openConnectLOLPopup &&
          <ConnectLOLPopup
            onCancel={() => setOpenConnectLOLPopup(false)}
            onConnectLOL={(summonerName) => connectLOL(summonerName)}
          />}
        <div className={s.overviewContainer}>
          <BannerOverview isLogin={AuthStore.isLoggedIn} />
          <div className={s.overviewSection} ref={connectGameRef as any}>
            <h2 className={s.overviewSectionTitle}>PLAY YOUR FAVORITE GAME</h2>
            <Row justify='space-between'>
              <Col className={s.bg_item} style={{ backgroundImage: 'url(/assets/P2E/overview/bg_lol.png)' }}>
                <Row align='middle' className={s.block_game}>
                  <Col className={s.img_game}>
                    <img src="/assets/P2E/overview/im_lol.png" alt="" />
                  </Col>
                  <Col className={s.content}>
                    <img className={s.logoPublisher} src="/assets/P2E/overview/garena-icon.svg" alt="" />
                    <h1>LEAGUE OF LEGENDS</h1>
                    <p>Normal, Ranked and ARAM games are available </p>
                    <div className={s.like}>
                      <img src="/assets/P2E/overview/user-check-icon.svg" alt="" /> {connectedUserLOL ?? "-"}
                    </div>
                    {isEmpty(lmssUser) ? (
                      <div
                        className={s.overviewBtnConnect}
                        onClick={() => onClickConnectLMSS()}
                      >
                        <div><span>{loadingLMSS && <Spin />}</span>CONNECT GAME</div>
                      </div>
                    ) : (
                      <div className={s.platformUser}>
                        <Image src={lmssUser?.avatar ? `${prefixAvatar}${lmssUser?.avatar}` : "/assets/avatar.jpg"} preview={false} alt="" className={s.platformUserAvatar} />
                        <div className={s.platformUserName}>{lmssUser?.nick_name}
                          <span>
                            <img src="/assets/P2E/overview/check-icon.svg" alt="" />
                          </span>
                        </div>
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
                    <img className={s.logoPublisher} src="/assets/P2E/overview/valve-icon.svg" alt="" />
                    <h1>CS:GO</h1>
                    <p>FACEIT 5v5 Ranked games are available</p>
                    <div className={s.like}>
                      <img src="/assets/P2E/overview/user-check-icon.svg" alt="" /> {connectedUserCSGO ?? "-"}
                    </div>
                    {isEmpty(faceitUser) ? (
                      <>
                        {/* <div id="faceitLogin" className={s.btnConnectGame}></div> */}
                        <div
                          className={s.overviewBtnConnect}
                          onClick={() => handleConnectFaceit()}
                        >
                          <div><span>{loadingFaceit && <Spin />}</span> CONNECT GAME</div>
                        </div>
                      </>
                    ) : (
                      <div className={s.platformUser}>
                        <Image src={faceitUser?.avatar ? faceitUser?.avatar : "/assets/avatar.jpg"} preview={false} alt="" className={s.platformUserAvatar} />
                        {/* <div className={s.platformUserName}>{faceitUser?.nick_name}</div> */}
                        <div className={s.platformUserName}>{faceitUser?.nick_name}
                          <span>
                            <img src="/assets/P2E/overview/check-icon.svg" alt="" />
                          </span>
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <Modal
        visible={campaignModalVisible}
        onCancel={handleCampaignModalCancel}
        wrapClassName={s.campaignModal}
        footer={[
          <Button
            key="1"
            type="link"
            onClick={handleCampaignModalDontShowAgain}
            className={s.campaignDontShowBtn}
          >
            Dont show again
          </Button>,
          <Button
            key="2"
            onClick={handleCampaignModalSignup}
            className={s.campaignSignupBtn}
          >
            <div>Sign up</div>
          </Button>
        ]}
      >
        <img src="/assets/P2E/Lucis_1000_point.png" alt="" className={s.campaignImg} />
      </Modal>
    </div>
  )
}
)
