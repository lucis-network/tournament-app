import {Button, Col, Row} from "antd";
import Link from "next/link";
import s from "./Footer.module.sass";
import React from "react";
import ButtonWrapper from "../../common/button/Button";

type Props = {};
export default function Footer(props: Props) {
  return (
    <section className={s.container_footer}>
      <div className="lucis-container-2">
        <Row>
          <Col xs={14} xl={2} className={s.logo}>
            <img src="/assets/footer/logo.svg" alt=""/>
          </Col>
          <Col xs={0} xl={14}>
            <ul className={s.block_item_menu}>
              <li><Link href="/">PLAYCORE</Link></li>
              <li><Link href="/arena">ARENA</Link></li>
              <li><a>RANKING</a></li>
              <li><a>SOCIALFI</a></li>
              <li><a>SCHORLARSHIP</a></li>
              <li><a>MARKETPLACE</a></li>
            </ul>
          </Col>
          <Col xs={10} xl={4} className={s.group_ic}>
            <div className={s.ic_item}>
              <a
                href="https://www.facebook.com/lucis.network"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/footer/tiktok.svg" alt=""/>
              </a>
            </div>
            <div className={s.ic_item}>
              <a
                href="https://www.facebook.com/lucis.network"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/footer/facebook.svg" alt=""/>
              </a>
            </div>
            <div className={s.ic_item}>
              <a
                href="https://www.youtube.com/lucisnetwork"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/footer/youtub.svg" alt=""/>
              </a>
            </div>
            <div className={s.ic_item}>
              <a
                href="https://twitter.com/LucisNetwork"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/footer/twitter.svg" alt=""/>
              </a>
            </div>
            <div className={s.ic_item}>
              <a
                href="https://discord.com/invite/kdDUjJcSF5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/footer/discord.svg" alt=""/>
              </a>
            </div>
            <div className={s.ic_item}>
              <a
                href="https://discord.com/invite/kdDUjJcSF5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/footer/twitch.svg" alt=""/>
              </a>
            </div>
          </Col>

          <Col xs={0} xl={4}>
            <div className={s.btn_help}>
              <Link href={`https://discord.gg/BMgT6mckTg`}>
                <ButtonWrapper width={200}>Need Help ?</ButtonWrapper>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
