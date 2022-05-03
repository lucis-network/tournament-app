import s from "./Overview.module.sass"
import { Row, Col } from 'antd';
import CardPlayed from "components/ui/common/cardsItem/played";
import CardTeam from "components/ui/common/cardsItem/cardTeam";

export default function Overview() {
  return(
    <Row className={s.wrapper}>
      <Col span={18} className={s.container_left}>
        <h1>Player Tournament</h1>
        <div className={s.player_tournament}>
          <div>
            <CardPlayed />
            <CardPlayed />
            <CardPlayed />
          </div>
          <button>Show more</button>
        </div>
        <h1>Favorite game</h1>

        <div className={s.favorite_game}>
          <div className={s.content_favorite_game}>
            <div className={s.img_game}>
              <div></div>
            </div>
            <p>Axie Infinity</p>
          </div>
          <div className={s.content_favorite_game}>
            <div className={s.img_game}>
              <div></div>
            </div>
            <p>Axie Infinity</p>
          </div>
          <div className={s.content_favorite_game}>
            <div className={s.img_game}>
              <div></div>
            </div>
            <p>Axie Infinity</p>
          </div>
          <div className={s.add_favorite_game}>
            <p>Add favorite game</p>
          </div>
        </div>
      </Col>

      {/* content right */}
      <Col  span={6} className={s.container_right}>
        <div className={s.biography}>
          <p>Biography</p>
          <div className={s.des}>
            Hello Muggle!!!
          </div>
        </div>
        <div className={s.social}>
          <p>Social</p>
          <div className={s.group_ic}>
            <div className={s.ic_item}>
              <a
                href="https://www.tiktok.com/@lucistvv"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/footer/tiktok.svg" alt="" />
              </a>
            </div>
            <div className={s.ic_item}>
              <a
                href="https://www.facebook.com/lucistv.news"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/footer/fb.svg" alt="" />
              </a>
            </div>
            <div className={s.ic_item}>
              <a
                href="https://www.youtube.com/c/LucisTVGaming"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/footer/ytb.svg" alt="" />
              </a>
            </div>
            <div className={s.ic_item}>
              <a
                href="https://t.me/sankeonft"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/footer/tele.svg" alt="" />
              </a>
            </div>
            <div className={s.ic_item}>
              <a
                href="https://twitter.com/Lucis_TV"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/footer/tw.svg" alt="" />
              </a>
            </div>
            <div className={s.ic_item}>
              <a
                href="https://discord.com/channels/911921072830574603/926398655093702666"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/footer/dis.svg" alt="" />
              </a>
            </div>
          </div>
        </div>
        <div className={s.team}>
          <p>Team</p>
          <div style={{ margin: '20px 0px' }}>
            <CardTeam />
            <CardTeam />
            <CardTeam />
          </div>
        </div>
      </Col>
    </Row>
  )
}