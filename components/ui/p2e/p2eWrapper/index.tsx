import React, { useState, useEffect, useCallback } from "react"
import DocHead from 'components/DocHead'
import Footer from 'components/ui/footer/Footer'
import s from './w.module.sass'
import { useRouter } from "next/router";
import AuthStore from "components/Auth/AuthStore";
import { observer } from "mobx-react-lite";
import AuthGameStore from "components/Auth/AuthGameStore";
import { Game } from "utils/Enum";
import { message } from "antd";

interface IProps {
  children: React.ReactChild | React.ReactChild[],
  mainClassname?: string,
}

export default observer(function P2EWrapper(props: IProps) {
  const router = useRouter();
  const [currentGame, setCurrentGame] = useState<Game>(Game.LOL);

  useEffect(() => {
    if (AuthGameStore.isLoggedInFaceit === true && AuthStore.isLoggedIn === true) {
      return;
    }

    if (whiteListTab()) {
      return;
    }

    if (AuthStore.isLoggedIn === false) {
      router.push("/");
      return;
    }

    if (AuthGameStore.isLoggedInFaceit === false) {
      router.push("/");
      return;
    };
  }, [AuthGameStore.isLoggedInFaceit])

  useEffect(() => {
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


  const whiteListTab = () => {
    const raffles = router.pathname.search("/p2e/raffles");
    return raffles > -1 || router.pathname === "/";
  }
  const handleTabClick = (path: string) => {
    if (!AuthStore.isLoggedIn &&
      (path === "/p2e/dashboard" || path === "/p2e/missions")) {
      message.error("Please sign in first!");
      return;
    }

    if (!AuthGameStore.isLoggedInFaceit &&
      (path === "/p2e/dashboard" || path === "/p2e/missions")) {
      message.error("Please connect game to continue!");
      return;
    }
    if (!tabDisabled(path)) {
      router.push(path);
    }

  }

  const tabActive = (path: string) => {
    if (router.pathname.search(path) > -1 && path !== "/") {
      return s.tabActive;
    }

    if (router.pathname === "/" && path === "/") {
      return s.tabActive;
    }

    return "";
  }

  const tabDisabled = (path: string) => {
    if (isDisabledTab(path)) {
      return s.tabDisabled;
    }
    return "";
  }

  const wrapperChildren = () => {
    return React.Children.map(props.children, child => {
      return React.cloneElement(child as any, {
        currentGame: currentGame
      })
    })
  }

  const backgroundPage = React.useCallback(() => {
    if (currentGame === Game.CSGO) {
      return s.backgroundCSGO;
    }

    if (currentGame === Game.LOL) {
      return s.backgroundLOL;
    }
    return "";
  }, [])
  return (
    <>
      <DocHead />
      <main style={{ minHeight: "100vh" }} className={`${s.homeWrap} ${props.mainClassname ?? ''} ${backgroundPage()}`}>
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
                          ${tabActive(item.path)}
                          ${tabDisabled(item.path)}
                        `}
                        onClick={() => handleTabClick(item.path)}
                      >{item.name}
                      </div>
                    )
                  })}
                </div>
                {(router.pathname !== "/" && router.pathname !== "/p2e/raffles") && <div className={s.chooseGame}>
                  <img
                    className={`${s.lolGame} ${currentGame === Game.LOL ? s.gameActive : ""}`}
                    src="/assets/P2E/lol-game.svg" alt="lol-game"
                    title="coming soon" />
                  <img
                    className={`${s.csgoGame} ${currentGame === Game.CSGO ? s.gameActive : ""}`}
                    src="/assets/P2E/csgo-game.svg" alt="csgo-game" />
                  <img
                    className={s.addGame}
                    src="/assets/P2E/add-game.svg"
                    alt="add-game"
                    onClick={() => router.push("/")} />
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