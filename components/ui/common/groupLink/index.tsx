import s from "./GroupLink.module.sass";

type Props = {
  datas?: any;
};
export default function GroupLink(props: Props) {
  const { datas } = props;

  return (
    <div className={s.group_ic}>
      <div className={s.ic_item}>
        {datas?.facebook && (
          <a
            // href="https://www.facebook.com/lucistv.news"
            href={datas?.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/footer/fb.svg" alt="" />
          </a>
        )}
      </div>
      {/* <div className={s.ic_item}>
        <a
          href="https://www.youtube.com/c/LucisTVGaming"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assets/footer/ytb.svg" alt="" />
        </a>
      </div> */}
      <div className={s.ic_item}>
        {datas?.telegram && (
          <a href={datas?.telegram} target="_blank" rel="noopener noreferrer">
            <img src="/assets/footer/tele.svg" alt="" />
          </a>
        )}
      </div>
      <div className={s.ic_item}>
        {datas?.twitter && (
          <a href={datas?.twitter} target="_blank" rel="noopener noreferrer">
            <img src="/assets/footer/tw.svg" alt="" />
          </a>
        )}
      </div>
      <div className={s.ic_item}>
        {datas.discord && (
          <a href={datas.discord} target="_blank" rel="noopener noreferrer">
            <img src="/assets/footer/dis.svg" alt="" />
          </a>
        )}
      </div>
    </div>
  );
}
