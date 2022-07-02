import React from "react"
import DocHead from 'components/DocHead'
import Footer from 'components/ui/footer/Footer'
import s from './w.module.sass'
import { useRouter } from "next/router";
import AuthStore from "components/Auth/AuthStore";
import { observer } from "mobx-react-lite";

interface IProps {
  children: React.ReactChild | React.ReactChild[],
  mainClassname?: string,
}
export default observer(function P2EWrapper(props: IProps) {
  const router = useRouter();
  const handleTabClick = (path: string) => {
    if (isDisabledTab(path) || disabledTab) {
      return;
    }
    router.push(path);
  }

  const [disabledTab, setDisabledTab] = React.useState(false);

  React.useEffect(() => {
    if (!AuthStore.isLoggedIn || !AuthStore.isLoggedInFaceit) {
      setDisabledTab(true);
      router.push("/");
    } else {
      setDisabledTab(false);
    }
  }, [AuthStore.isLoggedIn, AuthStore.isLoggedInFaceit])



  const tabs = [
    { path: "/", name: "Overview" },
    { path: "/p2e/dashboard", name: "Dashboard" },
    { path: "/p2e/missions", name: "Missions" },
    { path: "/p2e/raffles", name: "Raffles" },
    { path: "/p2e/items", name: "Items" },
    { path: "/p2e/battle-pass", name: "Battle pass" },
  ];

  const isDisabledTab = (tab: string) => {
    return tab === "/p2e/items" || tab === "/p2e/battle-pass";
  }

  return (
    <>
      <DocHead />
      <main style={{ minHeight: "100vh" }} className={`${s.homeWrap} ${props.mainClassname ?? ''}`}>
        <div className={`${s.p2eWrap}`}>
          <div className={s.tabsWrap}>
            <div className="lucis-container-2">
              <div className={s.tabs}>
                {tabs.map(item => {
                  return (
                    <div key={item.path}
                      title={isDisabledTab(item.path) ? "Coming soon" : ""}
                      className={
                        `${s.tabItem} 
                        ${router.pathname.search(item.path) > -1 && item.path !== "/" ? s.tabActive : ""}
                        ${router.pathname === "/" && item.path === "/" ? s.tabActive : ""}
                        ${isDisabledTab(item.path) ? s.tabDisabled : ""}
                        ${disabledTab && item.path !== "/" ? s.tabDisabled : ""}
                        `}
                      onClick={() => handleTabClick(item.path)}
                    >{item.name}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className={s.p2eContent}>
            {props.children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
)