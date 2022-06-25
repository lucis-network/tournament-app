import { message, Modal } from "antd";
import GoogleLogin from "react-google-login";
import { observer } from "mobx-react-lite";
import LoginBoxStore from "./LoginBoxStore";
import FacebookLogin from "@greatsumini/react-facebook-login";
import AuthStore, { AuthUser } from "../AuthStore";
import AuthService from "../AuthService";
import { useCallback, useEffect } from "react";
import { getLocalAuthInfo, setLocalAuthInfo } from "../AuthLocal";

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
    const token = cachedUser?.token;
    if (token) {
      console.log("{AuthService.login} re-login user: ");
      AuthStore.setAuthUser(cachedUser);
    }
  });

  const isModalVisible = LoginBoxStore.connectModalVisible,
    setIsModalVisible = (v: boolean) => (LoginBoxStore.connectModalVisible = v);

  const onSuccess = async (res: any, type: string) => {
    const authService = new AuthService();
    let tokenid = "";

    if (type === "google") tokenid = res?.tokenId;
    if (type === "facebook") tokenid = res?.accessToken;

    const r = await authService.login(tokenid, 100, type);

    switch (r.error) {
      case null:
        // Success
        // Already set the auth token to the LoginStore in LoginService
        console.log("Successfully connect");

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

  const isFacebookApp = function (ua: any) {
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
  }

  const onLoginClicked = (cb: (() => void) | undefined) => {
    return () => {
      // @ts-ignore
      var ua = navigator.userAgent || navigator.vendor || window.opera;
      if (isFacebookApp(ua)) {
        console.log('window.location.href: ', window.location.href)
        if (!window.location.href.match('redirect_fb')) {
          // force open in browser ... 
          // location.href = location.href;
        }
        message.warn("Please open web in browser to use full function")
        return;
      }
      console.log('not isFacebookApp')
      cb && cb();
    }
  }

  return (
    <>
      <Modal
        title={<span className="font-[600]">Login</span>}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        //wrapClassName={s.mdl}
        className={`flex justify-between`}
      >
        <GoogleLogin
          clientId={clientId}
          render={(renderProps) => (
            <button
              // onClick={renderProps.onClick}
              onClick={onLoginClicked(renderProps.onClick)}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
            >
              Login Google
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
              // onClick={renderProps.onClick}
              onClick={onLoginClicked(renderProps.onClick)}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded ml-20px`}
            >
              Login Facebook
            </button>
          )}
        ></FacebookLogin>
      </Modal>
    </>
  );
});
function ApoloClient_setAuthToken(token: string) {
  throw new Error("Function not implemented.");
}
