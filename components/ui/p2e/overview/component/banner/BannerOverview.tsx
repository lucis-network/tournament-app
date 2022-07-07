import LoginBoxStore from "components/Auth/Login/LoginBoxStore";
import s from "./BannerOverview.module.sass"

function BannerOverview() {
  const onSignIn = () => {
    LoginBoxStore.connectModalVisible = true;
  }
  return <div className={s.container}>
    <div className={s.banner_heading}>
      <h1>PLAY TO EARN 2.0</h1>
      <p>PLAY - ENJOY - EARN - REPEAT</p>
      <span>Join Lucis Network to get rewards from playing traditiones</span>

      <div className={s.btn_sign_in} onClick={() => onSignIn()}>
        <p>SIGN IN</p>
      </div>

      <div className={s.group_ic_banner}></div>
    </div>

    
    <div className={s.banner_thumb}>
      <img src="/assets/P2E/overview/thumb_banner.png" alt="" />
    </div>
  </div>;
}

export default BannerOverview;