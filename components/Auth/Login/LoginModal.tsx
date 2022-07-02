import { Modal } from "antd";
import GoogleLogin from "react-google-login";
import { observer } from "mobx-react-lite";
import LoginBoxStore from "./LoginBoxStore";
import FacebookLogin from "@greatsumini/react-facebook-login";
import AuthStore, { AuthUser } from "../AuthStore";
import AuthService from "../AuthService";
import { useCallback, useEffect } from "react";
import { getLocalAuthGameInfo, getLocalAuthInfo, setLocalAuthInfo } from "../AuthLocal";
import { isEmpty } from "lodash"
import Logo from "../../../assets/icon/logo.png";
import Image from "../../ui/common/images/Image";
import s from "./Login.module.sass"
import AuthGameStore, { AuthGameUser } from "../AuthGameStore";

type Props = {};

const clientId = process.env.NEXT_PUBLIC_GOOGLE_ID
  ? process.env.NEXT_PUBLIC_GOOGLE_ID
  : "";
const facebookId = process.env.NEXT_PUBLIC_FACEBOOK_ID
  ? process.env.NEXT_PUBLIC_FACEBOOK_ID
  : "";

export default observer(function LoginModal(props: Props) {
  useEffect(() => {
    const cachedUser: AuthUser | null = getLocalAuthInfo();
    const cachedGame: AuthGameUser | null = getLocalAuthGameInfo();
    const token = cachedUser?.token;
    if (token) {
      console.log("{AuthService.login} re-login user: ");
      AuthStore.setAuthUser(cachedUser);

    }

    if (cachedGame?.faceit_id_token) {
      AuthGameStore.setAuthGameUser(cachedGame);

    }

  }, []);

  const isModalVisible = LoginBoxStore.connectModalVisible,
    setIsModalVisible = (v: boolean) => (LoginBoxStore.connectModalVisible = v);

  const onSuccess = async (res: any, type: string) => {
    const authService = new AuthService();
    let tokenid = "";

    if (type === "google") tokenid = res?.tokenId;
    if (type === "facebook") tokenid = res?.accessToken;
    const r = await authService.login(tokenid, 100, type);
    console.log(AuthStore);
    const localUserInfo = getLocalAuthInfo();

    switch (r.error) {
      case null:
        // Success
        // Already set the auth token to the LoginStore in LoginService
        console.log("Successfully connect");
        if (isEmpty(localUserInfo?.profile?.user_name)) {
          LoginBoxStore.signupInfoModalVisible = true;
        }
        setTimeout(() => {
          setIsModalVisible(false);
        }, 2000);

        break;
    }
  };

  const onFailure = (res: any, str: string) => {
    console.log("Login failed: res:", res);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        //wrapClassName={s.mdl}
        className={`flex justify-center ${s.loginModal}`}
      >
        <div className="text-center mb-10">
          <div className="mb-5">
            <Image src={Logo} />
          </div>
          <h2 className="mb-1">Welcome to Lucis tournament</h2>
          <h4>Play to relax, but earn</h4>
        </div>
        <FacebookLogin
          appId={facebookId}
          onSuccess={(response) => {
            onSuccess(response, "facebook");
          }}
          onFail={(error) => {
            onFailure(error, "facebook");
          }}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-5 fb ${s.loginBtn} ${s.fb}`}
            >
              Sign in with Facebook
            </button>
          )}
        />
        <GoogleLogin
          clientId={clientId}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded gg ${s.loginBtn}`}
            >
              Sign in with Google
            </button>
          )}
          onSuccess={(response) => {
            onSuccess(response, "google");
          }}
          onFailure={(error) => {
            onFailure(error, "google");
          }}
          cookiePolicy={"single_host_origin"}
        />
        <p className="text-center mt-8">By continuing, you agree to Lucis&apos;s Terms of Service and acknowledge you&apos;ve read our Privacy Policy</p>
      </Modal>
    </>
  );
});
function ApoloClient_setAuthToken(token: string) {
  throw new Error("Function not implemented.");
}
