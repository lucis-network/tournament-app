import GradientButton from "components/ui/common/button/GradientButton";
import LoginBoxStore from "./LoginBoxStore";
import LoginModal from "./LoginModal";
import s from "./Login.module.sass"

export default function Login(props: any) {
  const showModal = () => {
    LoginBoxStore.connectModalVisible = true;
  };

  return (
    <>
      <GradientButton
        onClick={showModal}
        type={1}
        small={!!props.small}
        className={`${s.btn} `}
        style={{ whiteSpace: "nowrap", fontWeight: "600" }}
      >
        Login
      </GradientButton>

      <LoginModal />
    </>
  );
}
