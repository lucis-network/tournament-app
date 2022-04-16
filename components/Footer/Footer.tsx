import s from "./Footer.module.sass";

type Props = {};
export default function Footer(props: Props) {
  return (
    <section className="lucis-container">
      <div className={`${s.heading_footer} section-content`}>
        <div className={s.logo}>
          <img src="/assets/logo369-np.png" alt="" />
          <p className="text-14px md:text-18px text-right pt-[4px] m-0">
            Power by{" "}
            <a
              href="https://lucis.network/"
              target="_blank"
              rel="noopener noreferrer"
            >
              lucis.network{" "}
            </a>
          </p>
        </div>

        <div className={s.r}>
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

          {/* <div className={s.links}>
            <span>Useful links: </span>
            <a href="https://docsend.com/view/4mdgmehdtxrerwt6" target="_blank" rel="noopener noreferrer">Whitepaper</a>
            <a href="https://docsend.com/view/ck8dg35rkwqqjtf8" target="_blank" rel="noopener noreferrer">Pitch Deck</a>
            <Link href="/career">Careers</Link>
          </div> */}

        </div>
      </div>
      {/* <div className={s.groupLink}>
          <a href="#">Term of service</a>
          <a href="#">Privacy</a>
          <a href="#">Copyright</a>
          <a href="#">Help center</a>
          <a href="#">Blog</a>
        </div> */}
    </section>
  );
}
