import s from "./banner.module.sass";

export default function BannerPage() {
  return (
    <div className={s.wrapper_banner}>
      <div className={`${s.container} lucis-container`}>
        <div className={s.im_conver}></div>
      </div>
    </div>
  );
}
