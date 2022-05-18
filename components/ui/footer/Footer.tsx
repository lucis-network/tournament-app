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
                  href="https://www.facebook.com/lucis.network"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/assets/footer/fb.svg" alt="" />
                </a>
              </div>
              <div className={s.ic_item}>
                <a
                  href="https://www.youtube.com/lucisnetwork"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/assets/footer/ytb.svg" alt="" />
                </a>
              </div>
              <div className={s.ic_item}>
                <a
                  href="https://twitter.com/LucisNetwork"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/assets/footer/tw.svg" alt="" />
                </a>
              </div>
              <div className={s.ic_item}>
                <a
                  href="https://discord.gg/mnPXR3ag"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/assets/footer/dis.svg" alt="" />
                </a>
              </div>
            </div>

            <div className={s.btn_help}>
              <Button>NEED HELP?</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
