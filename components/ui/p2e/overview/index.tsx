import React, {useEffect, useState} from 'react'
import s from './P2EOverview.module.sass'
import {Button, Col, Image, Row} from "antd";
import {isEmpty} from "lodash";
import {PlatformAccount} from "../../../../src/generated/graphql";
import {isDevMode} from "../../../../utils/Env";

type P2EOverviewProps = {
  faceitUser: PlatformAccount,
}

const P2EOverview = ({ faceitUser }: P2EOverviewProps) => {
  const [faceitLogin, setFaceitLogin] = useState({
    login: () => {}
  })
  const fetchJsFromCDN = (src: string, externals: any[] = []) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.setAttribute('src', src)
      script.addEventListener('load', () => {
        resolve(externals.map(key => {
          const ext = window[key]
          typeof ext === 'undefined' && console.warn(`No external named '${key}' in window`)
          return ext
        }))
      })
      script.addEventListener('error', reject)
      document.body.appendChild(script)
    })
  }

  useEffect(() => {
    if (isEmpty(faceitUser)) {
      fetchJsFromCDN('https://cdn.faceit.com/oauth/faceit-oauth-sdk-1.2.7.min.js', ['FACEIT'])
        .then(([FACEIT]: any) => {
          function callback(response: any) {
            if (response.isIdTokenValid === true) {
              return
            }
            alert('The id token is not valid, something went wrong')
          }
          const initParams = {
            client_id: isDevMode ? process.env.NEXT_PUBLIC_FACEIT_CLIENT_ID_DEV : process.env.NEXT_PUBLIC_FACEIT_CLIENT_ID_TEST,
            response_type: 'token',
          }
          FACEIT.init(initParams, callback)
          setFaceitLogin({
            login: FACEIT.loginWithFaceit
          })
        })
    }
  }, [faceitUser])



  return (
    <div className={s.overviewContainer}>
      <div className={s.overviewSection}>
        <h2 className={s.overviewSectionTitle}>Choose game</h2>
        <Row>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <div className={s.gameItem}>
              <div className={s.gameImage}>
                <Image
                  src="/assets/P2E/lol-cover.jpg"
                  preview={false}
                  alt=""
                  className={s.gameCover}
                />
                <Image
                  src="/assets/P2E/lol-logo.webp"
                  preview={false}
                  alt=""
                  className={s.gameLogo}
                />
              </div>
              <div className={s.gameName}>
                <h3>League of Legends</h3>
                <Button className={s.btnConnectLol} disabled>Connect game</Button>
              </div>
            </div>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <div className={s.gameItem}>
              <div className={s.gameImage}>
                <Image
                  src="/assets/P2E/csgo-cover.webp"
                  preview={false}
                  alt=""
                  className={s.gameCover}
                />
                <Image
                  src="/assets/P2E/csgo-logo.webp"
                  preview={false}
                  alt=""
                  className={s.gameLogo}
                />
              </div>
              <div className={s.gameName}>
                <h3>CS:GO FACEIT</h3>
                {isEmpty(faceitUser) ? (
                  <>
                    {/*<div id="faceitLogin" className={s.btnConnectGame}></div>*/}
                    <Button onClick={faceitLogin.login} className={s.btnLoginFaceit}>CONNECT WITH FACEIT</Button>
                  </>
                ) : (
                  <div className={s.platformUser}>
                    <Image src={`${faceitUser?.avatar}`} preview={false} alt="" className={s.platformUserAvatar} />
                    <div className={s.platformUserName}>{faceitUser?.nick_name}</div>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default P2EOverview