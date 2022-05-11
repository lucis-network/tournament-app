import { Button } from "antd";
import s from "./Footer.module.sass";

type Props = {};
export default function Footer(props: Props) {
  return (
    <section className={s.container_footer}>
      <div className={s.content}>
        <div className="lucis-container">
          <div className={s.r}>
            <div className={s.logo}>
              <img src="/assets/footer/logo.png" alt="" />
            </div>
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

            <Button type="primary">NEED HELP?</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
