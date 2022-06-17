import React, { Children, useEffect, useState } from "react"
import DocHead from 'components/DocHead'
import Footer from 'components/ui/footer/Footer'
import { message } from "antd";
import s from './w.module.sass'
import { useMutation } from "@apollo/client"
import { isEmpty } from "lodash";
import { CONNECT_FACEIT, useGetPlatformAccount } from "hooks/p2e/useP2E";
import { PlatformAccount } from "src/generated/graphql";
import { useRouter } from "next/router";

interface IProps {
  children: React.ReactChild | React.ReactChild[]
}
const P2EWrapper = (props: IProps) => {
  const [connectFaceit] = useMutation(CONNECT_FACEIT, {
    context: {
      endpoint: 'p2e'
    }
  })

  const router = useRouter();
  const [loadingFaceit, setLoadingFaceit] = useState<boolean>(true);
  const [faceitUser, setFaceitUser] = useState<PlatformAccount>({} as PlatformAccount)
  const { getPlatformAccountData, getPlatformAccountLoading } = useGetPlatformAccount()

  const handleTabClick = (path: string) => {
    if (isEmpty(faceitUser)) {
      return;
    }
    router.push(path);
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
            router.push("/p2e/overview");
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

  const tabs = [
    { path: "/p2e/overview", name: "Overview" },
    { path: "/p2e/dashboard", name: "Dashboard" },
    { path: "/p2e/missions", name: "Missions" },
    { path: "/p2e/raffles", name: "Raffles" },
    { path: "/p2e/items", name: "Items" },
    { path: "/p2e/battle-pass", name: "Battle pass" },
  ];

  return (
    <>
      <DocHead />
      <main style={{ minHeight: "100vh" }} className={s.homeWrap}>
        <div className={`${s.p2eWrap}`}>
          <div className={s.tabsWrap}>
            <div className="lucis-container-2">
              <div className={s.tabs}>
                {tabs.map(item => {
                  return (
                    <div key={item.path}
                      className={
                        `${s.tabItem} 
                        ${router.pathname.search(item.path) > -1 ? s.tabActive : ""}
                        ${isEmpty(faceitUser) && router.pathname.search(item.path) === -1 ? s.tabDisabled : ""}`}
                      onClick={() => handleTabClick(item.path)}
                    >{item.name}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className={s.p2eContent}>
            {/* {tabActive === "Overview" && <P2EOverview faceitUser={faceitUser} isLoadingFaceitUser={loadingFaceit} />}
            {tabActive === "Dashboard" && <Dashboard />}
            {tabActive === "Missions" && <h2 style={{ color: "#fff", textAlign: "center", fontSize: 20, marginTop: 30 }}>Coming Soon</h2>}
            {tabActive === "Raffles" && <h2 style={{ color: "#fff", textAlign: "center", fontSize: 20, marginTop: 30 }}>Coming Soon</h2>}
            {tabActive === "Items" && <h2 style={{ color: "#fff", textAlign: "center", fontSize: 20, marginTop: 30 }}>Coming Soon</h2>}
            {tabActive === "Battle pass" && <h2 style={{ color: "#fff", textAlign: "center", fontSize: 20, marginTop: 30 }}>Coming Soon</h2>} */}
            {props.children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default P2EWrapper