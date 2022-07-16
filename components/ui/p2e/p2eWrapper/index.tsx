import React, { useState, useEffect, useCallback } from "react"
import DocHead from 'components/DocHead'
import Footer from 'components/ui/footer/Footer'
import s from './w.module.sass'
import { useRouter } from "next/router";
import AuthStore from "components/Auth/AuthStore";
import { observer } from "mobx-react-lite";
import AuthGameStore from "components/Auth/AuthGameStore";
import { Game, OverviewSection } from "utils/Enum";
import { message } from "antd";

interface IProps {
  children: React.ReactChild | React.ReactChild[],
  mainClassname?: string,
  wrapperChildrenClassname?: string,
}

export default observer(function P2EWrapper(props: IProps) {
  const router = useRouter();
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [overviewSection, setOverviewSection] = useState<OverviewSection>(OverviewSection.NONE);

  useEffect(() => {
    // if (AuthGameStore.isLoggedInFaceit === true && AuthStore.isLoggedIn === true) {
    //   if (!currentGame) {
    //     setCurrentGame(Game.CSGO);
    //     localStorage.setItem("currentGame", Game.CSGO.toString());
        
    //   }
    //   return;
    // }

    // if (AuthGameStore.isLoggedInLMSS === true && AuthStore.isLoggedIn === true) {
    //   if (!currentGame) {
    //     setCurrentGame(Game.LOL);
    //     localStorage.setItem("currentGame", Game.LOL.toString());
    //   }
    //   return;
    // }

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
  }, [AuthGameStore.isLoggedInFaceit, AuthGameStore.isLoggedInLMSS, AuthStore.isLoggedIn])

  useEffect(() => {
    // 
    const overviewSection = sessionStorage.getItem("overviewSection");
    if (overviewSection) {
      setOverviewSection(Number(overviewSection));
      sessionStorage.removeItem("overviewSection");
    }
    const currentGameLocal = localStorage.getItem("currentGame");
    let currentGameTmp = null;
    if (currentGameLocal) {
      if (Number(currentGameLocal) === Game.CSGO && AuthGameStore.isLoggedInFaceit) {
        currentGameTmp = Number(currentGameLocal);
        setCurrentGame(Number(currentGameLocal));
        return;
      }

      if (Number(currentGameLocal) === Game.LOL && AuthGameStore.isLoggedInLMSS) {
        currentGameTmp = Number(currentGameLocal);
        setCurrentGame(Number(currentGameLocal));
        return;
      }
    }

    if (!currentGameTmp) {
      setCurrentGame(Game.CSGO);
      localStorage.setItem("currentGame", Game.CSGO.toString());
    }
  }, [])

  const tabs = [
    { path: "/", name: "Overview" },
    { path: "/playcore/dashboard", name: "Dashboard" },
    { path: "/playcore/missions", name: "Missions" },
    { path: "/playcore/raffles", name: "Raffles" },
    { path: "/playcore/lucky-chest", name: "Lucky Chest" },
    { path: "/playcore/battle-pass", name: "Battle pass" },
  ];

  const isDisabledTab = (tab: string) => {
    return tab === "/playcore/battle-pass";
  }


  const whiteListTab = () => {
    const raffles = router.pathname.search("/playcore/raffles");
    return raffles > -1 || router.pathname === "/";
  }
  const handleTabClick = (path: string) => {
    if (!AuthStore.isLoggedIn &&
      (path === "/playcore/dashboard" || path === "/playcore/missions")) {
      message.error("Please sign in first!");
      return;
    }

    if (path === "/playcore/dashboard" || path === "/playcore/missions") {
      if (!AuthGameStore.isLoggedInLMSS && !AuthGameStore.isLoggedInFaceit) {
        setOverviewSection(OverviewSection.CONNECT_GAME);
        if (router.pathname !== "") {
          sessionStorage.setItem("overviewSection", OverviewSection.CONNECT_GAME.toString());
          router.push("/");
        }
        return;
      }

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
        currentGame: currentGame,
        overviewSection: overviewSection,
        resetOverviewSection: () => setOverviewSection(OverviewSection.NONE)
      })
    })
  }

  const backgroundPage = () => {
    if (currentGame === Game.CSGO) {
      return s.backgroundCSGO;
    }

    if (currentGame === Game.LOL) {
      return s.backgroundLOL;
    }
    return s.backgroundCSGO;
  }


  const setGame = (game: Game) => {
    if (currentGame === game) {
      return;
    }
    switch (game) {
      case Game.LOL:
        if (AuthGameStore.isLoggedInLMSS === false) {
          router.push("/");
          return;
        }
      case Game.CSGO:
        if (AuthGameStore.isLoggedInFaceit === false) {
          router.push("/");
          return;
        }
    }
    localStorage.setItem("currentGame", game.toString());
    setCurrentGame(game);
    if (router.pathname === "/playcore/dashboard" || router.pathname  === "/playcore/missions") {
      return;
    }
    router.push("/playcore/dashboard");
  }

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
                {(AuthStore.isLoggedIn && router.pathname !== "/" && router.pathname !== "/playcore/raffles") &&
                  <div className={s.chooseGame}>
                    {AuthGameStore.isLoggedInLMSS && <img
                      className={`${s.lolGame} ${currentGame === Game.LOL ? s.gameActive : ""}`}
                      src="/assets/P2E/lol-game.svg" alt="lol-game"
                      onClick={() => setGame(Game.LOL)} />}
                    {AuthGameStore.isLoggedInFaceit && <img
                      className={`${s.csgoGame} ${currentGame === Game.CSGO ? s.gameActive : ""}`}
                      onClick={() => setGame(Game.CSGO)}
                      src="/assets/P2E/csgo-game.svg" alt="csgo-game" />}
                    <img
                      className={s.addGame}
                      src="/assets/P2E/add-game.svg"
                      alt="add-game"
                      onClick={() => {router.push("/"); sessionStorage.setItem("overviewSection", OverviewSection.CONNECT_GAME.toString());}} />
                  </div>}
              </div>
            </div>
          </div>
          <div className={`${s.p2eContent} ${props.wrapperChildrenClassname ?? ''}`}>
            {wrapperChildren()}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
)