import React, { useEffect, useState } from "react"
import DocHead from 'components/DocHead'
import Footer from 'components/ui/footer/Footer'
import { NextPage } from "next";
import { Col, message, Row, Tabs } from "antd";
import P2EOverview from "components/ui/p2e/overview"
import Dashboard from "components/ui/p2e/dashboard"
import s from './Home.module.sass'
import { useMutation } from "@apollo/client"
import { CONNECT_FACEIT, useGetPlatformAccount } from "../hooks/p2e/useP2E"
import { PlatformAccount } from "../src/generated/graphql_p2e";
import Missions from "../components/ui/p2e/missions";
import { isEmpty } from "lodash";


const Home: NextPage = () => {
  const [connectFaceit] = useMutation(CONNECT_FACEIT, {
    context: {
      endpoint: 'p2e'
    }
  })
  const [loadingFaceit, setLoadingFaceit] = useState<boolean>(true);
  const [faceitUser, setFaceitUser] = useState<PlatformAccount>({} as PlatformAccount)
  const [tabActive, setTabActive] = useState<string>('Overview')
  const { getPlatformAccountData, getPlatformAccountLoading } = useGetPlatformAccount()

  const handleTabClick = (key: string) => {
    if (isEmpty(faceitUser)) {
      return;
    }
    setTabActive(key)
  }

  useEffect(() => {
    let isSubscribed = true
    const handleHashChange = () => {
      setLoadingFaceit(true);
      let hashData = window.location.hash
      if (hashData.startsWith('#token=') && hashData.includes('id_token')) {
        const newHashData = new URLSearchParams(hashData.replace('#token=', '?token='))
        const tokenData = {
          accessToken: newHashData.get('token'),
          idToken: newHashData.get('id_token')
        }
        connectFaceit({
          variables: tokenData
        }).then(response => {
          if (isSubscribed) {
            history.replaceState(null, '', ' ')
            setFaceitUser(response.data.connectFaceit)
            setTabActive('Dashboard')
          }
          setLoadingFaceit(false);
        }).catch(error => {
          if (isSubscribed) {
            history.replaceState(null, '', ' ')
            console.log(error)
            message.error("This account is already connected to another user! Please use another account.")
          }
          setLoadingFaceit(false);
        })
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

  const tabs = ["Overview", "Dashboard", "Missions", "Raffles", "Items", "Battle pass"];

  return (
    <>
      <DocHead />
      <main style={{ minHeight: "100vh" }} className={s.homeWrap}>
        <div className={`${s.p2eWrap}`}>
          <div className={s.tabsWrap}>
            <div className="lucis-container-2">
              <div className={s.tabs}>
                {/* <Tabs defaultActiveKey={tabActive} activeKey={tabActive} onTabClick={handleTabClick}>
                <TabPane tab="P2E 2.0" key="p2e">
                  <P2EOverview faceitUser={faceitUser} isLoadingFaceitUser={loadingFaceit} />
                </TabPane>
                <TabPane tab="Dashboard" key="dashboard" disabled={isEmpty(faceitUser)}>
                  <DailyMission />
                </TabPane>
                <TabPane tab="Missions" key="missions" disabled={isEmpty(faceitUser)}>
                  <Missions />
                </TabPane>
                <TabPane tab="Raffles" key="raffles" disabled>
                  Content of Raffles
                </TabPane>
                <TabPane tab="Items" key="items" disabled>
                  Content of Items
                </TabPane>
                <TabPane tab="Battle pass" key="battlePass" disabled>
                  Content of Battle pass
                </TabPane>
              </Tabs> */}
                {tabs.map(item => {
                  return (
                    <div key={item}
                      className={
                        `${s.tabItem} 
                        ${tabActive === item ? s.tabActive : ""}
                        ${isEmpty(faceitUser) && tabActive !== item ? s.tabDisabled : ""}`}
                      onClick={() => handleTabClick(item)}
                    >{item}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className={s.p2eContent}>
            {tabActive === "Overview" && <P2EOverview faceitUser={faceitUser} isLoadingFaceitUser={loadingFaceit} />}
            {tabActive === "Dashboard" && <Dashboard />}
            {tabActive === "Missions" && <Missions />}
            {tabActive === "Raffles" && <h2 style={{ color: "#fff", textAlign: "center", fontSize: 20 }}>Coming Soon</h2>}
            {tabActive === "Items" && <h2 style={{ color: "#fff", textAlign: "center", fontSize: 20 }}>Coming Soon</h2>}
            {tabActive === "Battle pass" && <h2 style={{ color: "#fff", textAlign: "center", fontSize: 20 }}>Coming Soon</h2>}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Home