import React, { useEffect, useState } from "react"
import DocHead from 'components/DocHead'
import Footer from 'components/ui/footer/Footer'
import { NextPage } from "next";
import { Tabs } from "antd";
import P2EOverview from "components/ui/p2e/overview"
import Dashboard from "components/ui/p2e/dashboard"
import s from './Home.module.sass'
import { useMutation } from "@apollo/client"
import { CONNECT_FACEIT, useGetPlatformAccount } from "../hooks/p2e/useP2E"
import { PlatformAccount } from "../src/generated/graphql_p2e";
import Missions from "../components/ui/p2e/missions";
import { isEmpty } from "lodash";

const { TabPane } = Tabs;

const Home: NextPage = () => {
  const [connectFaceit] = useMutation(CONNECT_FACEIT, {
    context: {
      endpoint: 'p2e'
    }
  })
  const [faceitUser, setFaceitUser] = useState<PlatformAccount>({} as PlatformAccount)
  const [tabActiveKey, setTabActiveKey] = useState<string>('p2e')
  const { getPlatformAccountData } = useGetPlatformAccount()

  const handleTabClick = (key: string) => {
    setTabActiveKey(key)
  }

  useEffect(() => {
    let isSubscribed = true
    const handleHashChange = () => {
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
            setTabActiveKey('daily')
          }
        }).catch(error => {
          if (isSubscribed) {
            history.replaceState(null, '', ' ')
            console.log(error)
          }
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
    }
    return () => {
      isSubscribed = false
    }
  }, [getPlatformAccountData?.getPlatformAccount])

  return (
    <>
      <DocHead />
      <main style={{ minHeight: "100vh" }} className={s.homeWrap}>
        <div className={`${s.p2eWrap} lucis-container-2`}>
          <Tabs defaultActiveKey={tabActiveKey} activeKey={tabActiveKey} onTabClick={handleTabClick}>
            <TabPane tab="P2E 2.0" key="p2e">
              <P2EOverview />
            </TabPane>
            <TabPane tab="Daily" key="daily" disabled={isEmpty(faceitUser)}>
              {/* <Dashboard /> */}
            </TabPane>
            <TabPane tab="Missions" key="missions" disabled={isEmpty(faceitUser)}>
              {/* <Missions /> */}
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
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Home