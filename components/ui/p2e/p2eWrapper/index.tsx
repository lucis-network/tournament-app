import React from "react"
import DocHead from 'components/DocHead'
import Footer from 'components/ui/footer/Footer'
import s from './w.module.sass'
import { useRouter } from "next/router";
import AuthStore from "components/Auth/AuthStore";
import { observer } from "mobx-react-lite";
import AuthGameStore from "components/Auth/AuthGameStore";

interface IProps {
  children: React.ReactChild | React.ReactChild[],
  mainClassname?: string,
}

export enum Game {
  CSGO,
  LOL
}
export default observer(function P2EWrapper(props: IProps) {
  const router = useRouter();
  const [disabledTab, setDisabledTab] = React.useState(false);
  const [currentGame, setCurrentGame] = React.useState<Game>(Game.CSGO);

  React.useEffect(() => {
    if (AuthGameStore.isLoggedInFaceit === true && AuthStore.isLoggedIn === true) {
      setDisabledTab(false);
      return;
    }

    if (AuthStore.isLoggedIn === false) {
      setDisabledTab(true);
      router.push("/");
      return;
    }

    if (AuthGameStore.isLoggedInFaceit === false) {
      setDisabledTab(true);
      router.push("/");
      return;
    }
    setDisabledTab(true);
  }, [AuthGameStore.isLoggedInFaceit])

  React.useEffect(() => {
    const currentGameLocal = localStorage.getItem("currentGame");
    if (currentGameLocal) {
      setCurrentGame(Number(currentGameLocal));
    }
  }, [])

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
  const handleTabClick = (path: string) => {
    if (isDisabledTab(path) || disabledTab) {
      return;
    }
    router.push(path);
  }

  const wrapperChildren = () => {
    return React.Children.map(props.children, child => {
      return React.cloneElement(child as any, {
        currentGame: currentGame
      })
    })
  }

  return (
    <>
      <DocHead />
      <main style={{ minHeight: "100vh" }} className={`${s.homeWrap} ${props.mainClassname ?? ''}`}>
        <div className={`${s.p2eWrap}`}>
          <div className={s.tabsWrap}>
            <div className="lucis-container-2">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
                {router.pathname !== "/" && <div className={s.chooseGame}>
                  <img className={s.lolGame} src="/assets/P2E/lol-game.svg" alt="lol-game" />
                  <img className={s.csgoGame} src="/assets/P2E/csgo-game.svg" alt="csgo-game" />
                  <img className={s.addGame} src="/assets/P2E/add-game.svg" alt="add-game" onClick={() => router.push("/")} />
                </div>}
              </div>
            </div>
          </div>
          <div className={s.p2eContent}>
            {wrapperChildren()}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
)