import GradientButton from 'components/Button/GradientButton';
import LoginBoxStore from './LoginBoxStore';
import LoginModal from './LoginModal';

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
        className={`text-white text-24px leading-28px px-40px py-15px `}
        style={{ whiteSpace: "nowrap", fontWeight: "600" }}
      >
        Login
      </GradientButton>

      <LoginModal />
    </>
  );
}
