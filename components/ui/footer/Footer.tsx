import {Button, Col, Row} from "antd";
import Link from "next/link";
import s from "./Footer.module.sass";
import React from "react";
import ButtonWrapper from "../../common/button/Button";

type Props = {};
export default function Footer(props: Props) {
  return (
    <section className={`${s.container_footer}`}>
      <div className={`lucis-container-2`}>
        <div className={s.logo}>
          <img src="/assets/home/logo.png" alt=""/>
        </div>
        <Row>
          <Col xs={12} md={8} xl={0} className={s.logoTab}>
            <img src="/assets/home/logo.png" alt=""/>
          </Col>
          <Col xs={0} xl={16}>
            <ul className={s.block_item_menu}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/">Playcore</Link></li>
              <li><Link href="/arena">Arena</Link></li>
              <li><a>Ranking</a></li>
              <li><a>Raffles</a></li>
              <li><a>Scholarship</a></li>
              <li><a>SocialFi</a></li>
              <li><a>Marketplace</a></li>
            </ul>
          </Col>

          <Col xs={12} md={16} xl={8}>
            <div className={s.wrapper}>
              <div className={s.group_ic}>
                <div className={s.ic_item}>
                  <a
                    href="https://www.tiktok.com/@lucistvv"
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
              </div>
              <div className={s.btn_help}>
                <Link href={`https://discord.gg/BMgT6mckTg`}>
                  <ButtonWrapper width={200}>Need Help ?</ButtonWrapper>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
