import {Button, Form, Input, Modal} from "antd";
import GoogleLogin from "react-google-login";
import { observer } from "mobx-react-lite";
import LoginBoxStore from "./LoginBoxStore";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { getLocalAuthInfo } from "../AuthLocal";
import { isEmpty } from "lodash"
import AuthStore, {AuthUser} from "../AuthStore";
import AuthService, { AuthError } from "../AuthService";
import {useEffect, useState} from "react";
import Logo from "../../../assets/icon/logo.png";
import Image from "../../ui/common/images/Image";
import s from "./Login.module.sass"
import GAService from "../../../services/GA";
import {useRouter} from "next/router";
import {isClientDevMode} from "../../../utils/Env";
import {AppEmitter} from "../../../services/emitter";

type Props = {};

const clientId = process.env.NEXT_PUBLIC_GOOGLE_ID
  ? process.env.NEXT_PUBLIC_GOOGLE_ID
  : "";
const facebookId = process.env.NEXT_PUBLIC_FACEBOOK_ID
  ? process.env.NEXT_PUBLIC_FACEBOOK_ID
  : "";

export default observer(function LoginModal(props: Props) {
  const route = useRouter();
  const [form] = Form.useForm();

  const [messageInvalLogin, setMessageInvalLogin] = useState("");
  const [code, setCode] = useState<string>();

  useEffect(() => {
    if(route?.query && route?.query?.ref) {
      // @ts-ignore
      setCode(route?.query?.ref)
    }
  }, [route?.query])

  const trackUserChangeToAnalytic = (user: AuthUser) => {
    if (user.id) {
      const {id, name, role} = user;
      GAService.setUserProperties({id, name, role});
    }
  }

  useEffect(() => {
    const authService = new AuthService();
    authService.getUserData();
  }, []);

  const isModalVisible = LoginBoxStore.connectModalVisible,
    setIsModalVisible = (v: boolean) => (LoginBoxStore.connectModalVisible = v);
  const setIsAlertInAppModalVisible = (v: boolean) => (LoginBoxStore.alertInAppModalVisible = v);

  const onSuccess = async (res: any, type: string, username?: string, password?: string) => {
    const authService = new AuthService();
    let tokenid = "";

    if (type === "google") tokenid = res?.tokenId;
    if (type === "facebook") tokenid = res?.accessToken;
    const r = await authService.login(tokenid,code, 100, type, username, password);
    // console.log(AuthStore);
    const localUserInfo = getLocalAuthInfo();

    if (localUserInfo?.token) {
      trackUserChangeToAnalytic(localUserInfo);
    }

    switch (r.error) {
      case null:
        // Success
        // Already set the auth token to the LoginStore in LoginService
        console.log("Successfully connect");
        AppEmitter.emit("saveUtmAfterLoginSuccess", r);
        if (isEmpty(localUserInfo?.profile?.user_name) || localUserInfo?.is_exist_pass === false) {
          LoginBoxStore.signupInfoModalVisible = true;
        }
        // setTimeout(() => {

        // }, 2000);
        setIsModalVisible(false);
        setMessageInvalLogin("");
        if (route.pathname === "/tournament/[id]/[...slug]" || route.pathname === "/playcore/lucky-chest") {
          route.reload();
        }
        break;

      case AuthError.Unknown:
        //Login Fail
        if(type === "username") setMessageInvalLogin("The username or password is incorrect!");
        else setMessageInvalLogin("Login fail. Please try again!");
        break;
    }
  };

  const onFailure = (res: any, str: string) => {
    console.log("Login failed: res:", res);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const detectInAppBrowser = (ua: any) => {
    ua = ua.toLowerCase().trim();
    const isIOS = ua.includes('iphone') || ua.includes('ipod') || ua.includes('ipad');
    const isAndroid = ua.includes('android');

    // iOS Chrome
    if (ua.includes('crios')) {
      return 'is_chrome_ios';
    }

    // Facebook
    if ((ua.indexOf("fban") > -1) || (ua.indexOf("fbav") > -1)) {
      return isIOS
        ? 'is_facebook_ios'
        : isAndroid
          ? 'is_facebook_android'
          : 'is_facebook_unknown';
    }

    // Instagram
    if (ua.indexOf('instagram') > -1) {
      return isIOS
        ? 'is_instagram_ios'
        : isAndroid
          ? 'is_instagram_android'
          : 'is_instagram_unknown';
    }

    // LINE
    if (ua.includes(' line/')) {
      return isIOS
        ? 'is_line_ios'
        : isAndroid
          ? 'is_line_android'
          : 'is_line_unknown';
    }

    // iOS Safari|Twitter|Slack|Discord|etc
    if (isIOS && /safari\/[0-9.]+$/.test(ua)) {
      return 'maybe_safari_ios';
    }

    // Android Chrome|Twitter|Slack|Discord|etc
    if (isAndroid && ua.includes('chrome') && /safari\/[0-9.]+$/.test(ua)) {
      return 'maybe_chrome_android';
    }

    return null;
  }

  const onLoginClicked = (cb: (() => void) | undefined) => {
    return () => {
      // @ts-ignore
      let ua = navigator.userAgent || navigator.vendor || window.opera;
      if (isClientDevMode) {
        alert(`[onLoginClicked] detectInAppBrowser(ua): ${detectInAppBrowser(ua)} ------------ user agent: ${ua}`)
      }
      if (['is_facebook_ios', 'is_facebook_android', 'is_facebook_unknown', 'is_instagram_ios', 'is_instagram_android', 'is_instagram_unknown', 'is_line_ios', 'is_line_android', 'is_line_unknown'].includes(detectInAppBrowser(ua) as string)) {
        setIsAlertInAppModalVisible(true)
        setIsModalVisible(false)
        // message.warn("Please open web in browser to use full function")
        return;
      }
      cb && cb();
    }
  }

  const onSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          const response = await onSuccess({}, "username", values.username, values.password);
        } catch (error) {
          console.error('error updateProfileMutation: ', error);
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  // @ts-ignore
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
          <h2 className="mb-1">Welcome to Lucis Network</h2>
          <h4>Play to relax, but earn</h4>
        </div>
        <div>
          <Form
            name="basic"
            form={form}
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={{remember: true}}
            autoComplete="off"
          >
            <div className={s.labelLogin}>
              <label>Username</label>
            </div>
            <div>
              <Form.Item
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
              >
                <Input className={s.inputLogin} placeholder="Enter account"/>
              </Form.Item>
            </div>

            <div className={s.labelLogin}>
              <label>Password</label>
            </div>
            <div>
              <Form.Item
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            </div>
            <div className={s.forgotPassword} title="Coming soon" style={{cursor: 'pointer', textDecoration: 'underline'}}>
              Forgot password
            </div>
            <div className={`${s.message_error} ml-[10px]`}>
              {messageInvalLogin}
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit"  className={s.buttonLogin} onClick={onSubmit}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={s.or}>
          <span>or</span>
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
              // onClick={renderProps.onClick}
              onClick={onLoginClicked(renderProps.onClick)}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-5 fb ${s.loginBtn} ${s.fb} `}
            >
              Sign in with Facebook
            </button>
          )}
        />
        <GoogleLogin
          clientId={clientId}
          render={(renderProps) => (
            <button
              // onClick={renderProps.onClick}
              onClick={onLoginClicked(renderProps.onClick)}
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
        {isClientDevMode && (
          <button
            onClick={onLoginClicked(undefined)}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded gg mt-20 ${s.loginBtn}`}
          >
            Test user agent
          </button>
        )}
        <p className="text-center mt-8">By continuing, you agree to Lucis&apos;s Terms of Service and acknowledge
          you&apos;ve read our Privacy Policy</p>
      </Modal>
    </>
  );
});

function ApoloClient_setAuthToken(token: string) {
  throw new Error("Function not implemented.");
}
