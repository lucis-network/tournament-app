import s from "./Info.module.sass";
import AuthStore from "../../../../Auth/AuthStore";
import {getLocalAuthInfo} from "../../../../Auth/AuthLocal";
import {Image} from "antd";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";

type Props = {
  click: () => void;
};
export default observer(function InfoMyProfile(props: Props) {
  const router = useRouter();
  const { id } = router.query || AuthStore;
  const userInfo = AuthStore;

  return (
    <div className={s.container}>
      <div
        className={s.banner}
        style={{ backgroundImage: `url(${userInfo?.profile?.cover || '/profile/banner.png'})` }}
      />
      <div className={`${s.user_information} lucis-container`}>
        <div className={s.user_information_left}>
          <div className={s.avt}>
            <img src={userInfo?.profile?.avatar || '/profile/im_user.png'} alt="" />
          </div>
          <div className={s.information}>
            <p>{userInfo?.profile?.display_name}</p>
            <p>Username: @{userInfo?.profile?.user_name}</p>
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
});
