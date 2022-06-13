import s from "./GroupLink.module.sass";

type Props = {
  datas?: any;
};
export default function GroupLink(props: Props) {
  const { datas } = props;

  return (
    <div className={s.group_ic}>
      {datas?.facebook && (
        <div className={s.ic_item}>
          <a href={datas?.facebook} target="_blank" rel="noopener noreferrer">
            <img src="/assets/MyProfile/iconFacebookWhite.svg" alt="" />
          </a>
        </div>
      )}

      {datas?.youtube && (
        <div className={s.ic_item}>
          <a href={datas?.youtube} target="_blank" rel="noopener noreferrer">
            <img src="/assets/MyProfile/iconYoutubeWhite.svg" alt="" />
          </a>
        </div>
      )}
      
      {datas?.twitch && (
        <div className={s.ic_item}>
          <a href={datas?.twitch} target="_blank" rel="noopener noreferrer">
            <img src="/assets/MyProfile/iconTwitchWhite.svg" alt="" />
          </a>
        </div>
      )}

      {datas?.twitter && (
        <div className={s.ic_item}>
          <a href={datas?.twitter} target="_blank" rel="noopener noreferrer">
            <img src="/assets/MyProfile/iconTwitterWhite.svg" alt="" />
          </a>
        </div>
      )}

      {datas.discord && (
        <div className={s.ic_item}>
          <a href={datas.discord} target="_blank" rel="noopener noreferrer">
            <img src="/assets/MyProfile/iconDiscordWhite.svg" alt="" />
          </a>
        </div>
      )}
    </div>
  );
}
