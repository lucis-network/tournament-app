import React, {useEffect, useState} from "react"
import DocHead from 'components/DocHead'
import Footer from 'components/ui/footer/Footer'
import {NextPage} from "next";
import {Tabs} from "antd";
import P2EOverview from "components/ui/p2e/overview"
import DailyMission from "components/ui/p2e/daily"
import s from './Home.module.sass'
import {useMutation} from "@apollo/client"
import {CONNECT_FACEIT, useGetPlatformAccount} from "../hooks/p2e/useP2E"
import {PlatformAccount} from "../src/generated/graphql";

const { TabPane } = Tabs;



const Home: NextPage = () => {
  const [connectFaceit] = useMutation(CONNECT_FACEIT)
  const [faceitUser, setFaceitUser] = useState<PlatformAccount>({} as PlatformAccount)
  const {getPlatformAccountData} = useGetPlatformAccount()

  useEffect(() => {
    const handleHashChange = () => {
      let hashData = window.location.hash
      if (hashData.startsWith('#token=') && hashData.includes('id_token')) {
        const newHashData = new URLSearchParams(hashData.replace('#token=', '?token='))
        const tokenData = {
          accessToken: newHashData.get('token'),
          IdToken: newHashData.get('id_token')
        }
        connectFaceit({
          variables: tokenData
        }).then(response => {
          history.replaceState(null, '', ' ')
          setFaceitUser(response.data.connectFaceit)
          console.log(response);
        }).catch(error => {
          history.replaceState(null, '', ' ')
          console.log(error)
        })
      }
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  useEffect(() => {
    let isSubscribed = true
    setFaceitUser(getPlatformAccountData?.getPlatformAccount)
    return () => {
      isSubscribed = false
    }
  }, [getPlatformAccountData?.getPlatformAccount])

  return (
    <>
      <DocHead />
      <main style={{minHeight: "100vh"}} className={s.homeWrap}>
        <div className="lucis-container-2">
          <Tabs defaultActiveKey="p2e">
            <TabPane tab="P2E 2.0" key="p2e">
              <P2EOverview faceitUser={faceitUser} />
            </TabPane>
            <TabPane tab="Daily" key="daily">
              <DailyMission />
            </TabPane>
            <TabPane tab="Missions" key="missions" disabled>
              Content of Missions
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