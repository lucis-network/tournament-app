import { Col, Row } from "antd";
import LoginBoxStore from "components/Auth/Login/LoginBoxStore";
import s from "./BannerOverview.module.sass"

interface IProps {
  isLogin?: boolean;
}
function BannerOverview(props: IProps) {
  const onSignIn = () => {
    LoginBoxStore.connectModalVisible = true;
  }
  return (
  <Row className={s.container}>
    <Col xs={24} lg={10} className={s.banner_heading}>
      <h1>PlayCore</h1>
      <p>PLAY - ENJOY - EARN - REPEAT</p>
      <span>Get reward from playing your favourite traditional games</span>
      {!props.isLogin &&
      <div className={s.btn_sign_in} onClick={() => onSignIn()}>
        <span>SIGN IN</span>
      </div>
      }
      <div className={s.group_ic_banner}></div>
    </Col>

    
    <Col xs={24} lg={14} className={s.banner_thumb}>
      <img src="/assets/P2E/overview/thumb_banner.png" alt="" />
    </Col>
  </Row>
  );
}

export default BannerOverview;