import s from "./Info.module.sass";
import AuthStore from "../../../../Auth/AuthStore";

type Props = {
  click: () => void;
};
export default function InfoMyProfile(props: Props) {
  const { id } = AuthStore;

  return (
    <div className={s.container}>
      <div
        className={s.banner}
        style={{ backgroundImage: "url(/profile/banner.png)" }}
      ></div>
      <div className={`${s.user_information} lucis-container`}>
        <div className={s.user_information_left}>
          <div className={s.avt}>
            <img src="/profile/im_user.png" alt="" />
          </div>
          <div className={s.information}>
            <p>Shippou_chan</p>
            <p>verified</p>
            <p>id: {id}</p>
            <button className={s.share_info}>
              <img src="/profile/svg/ic_share.svg" alt="" />
              <span>Share</span>
            </button>
          </div>
        </div>
        <div className={s.user_information_right}>
          <button onClick={props.click}>Edit Profile</button>
        </div>
      </div>
    </div>
  );
}
