import { Button, Form, FormInstance, Image, Input, Modal, Select } from "antd";
import LoginBoxStore from "./LoginBoxStore";
import { getLocalAuthInfo, setLocalAuthInfo } from "../AuthLocal";
import { observer } from "mobx-react-lite";
import React, {useCallback, useEffect, useRef, useState} from "react";
import s from "./Login.module.sass"
import { gql, useMutation, useQuery } from "@apollo/client";
import { debounce, isEmpty } from "lodash";
import AuthService from "../AuthService";
import Country from "country.json"
import AuthStore from "../AuthStore";

type SignupInfoModalProps = {};

type Country = {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($data: ProfileUpdateInput!) {
    updateProfile(data: $data) {
      user_id
      user_name
      country_code
    }
  }
`;

const CHECK_USERNAME = gql`
  query ($value: String!) {
    checkUserName(value: $value)
  }
`;

export default observer(function SignupInfoModal(props: SignupInfoModalProps) {
  const localUserInfo = getLocalAuthInfo();
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [updateProfileMutation] = useMutation(UPDATE_PROFILE);
  const [username, setUsername] = useState<string>(localUserInfo?.profile?.user_name ?? '');
  const [userNameExisted, setUserNameExisted] = useState(false)
  const [form] = Form.useForm();
  const ref = useRef();

  const handleKeyUp = (event: any) => {
    // Enter
    if (event.keyCode === 13) {
      // @ts-ignore
      //ref.current.submit();
      handleComplete();
    }
  }

  const userNameRef = useRef(null)
  const {
    loading: checkUsernameLoading,
    error: checkUsernameError,
    data: checkUsernameData
  } = useQuery(CHECK_USERNAME, {
    variables: {
      value: username
    },
    skip: isEmpty(username),
    onCompleted: (data) => {
      setUserNameExisted(data.checkUserName)
    }
  })


  useEffect(() => {
    if (!isEmpty(username) && userNameExisted) {
      form.setFields([
        {
          name: 'user_name',
          errors: ['This username already exists.'],
        },
      ]);
    }
  }, [username, userNameExisted])
  const isModalVisible = LoginBoxStore.signupInfoModalVisible,
    setIsModalVisible = (value: boolean) => (LoginBoxStore.signupInfoModalVisible = value);
  const { Option } = Select;

  const fetchCountryList = (): void => {
    const sortedData = Country.data.sort((a: any, b: any) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    setCountryList(sortedData);
  }

  const handleComplete = (): void => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          const response = await updateProfileMutation({
            variables: {
              data: {
                user_name: {
                  set: username
                },
                country_code: values.country_code,
                password: {
                  set: values.password
                }
              }
            }
          });
          const { user_name, country_code } = response.data.updateProfile;
          const user = getLocalAuthInfo()!;
          await new Promise(resolve => setTimeout(resolve, 500))
          const newUserData = {...user}
          if (newUserData && newUserData.profile) {
            newUserData.profile.user_name = user_name;
            newUserData.profile.country_code = country_code;
            if (!isEmpty(values.password)) {
              newUserData.is_exist_pass = true
            }
            setLocalAuthInfo(newUserData);
          }
        } catch (error) {
          console.error('error updateProfileMutation: ', error);
        } finally {
          setIsModalVisible(false);
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleLogout = () => {
    const authService = new AuthService();
    authService.logout();
    return false;
  }

  const debouncedInputTyping = useCallback(
    debounce((value: string) => {
      // chaupa todo check if username already exists
      setUsername(value);
    }, 500),
    []
  );


  const handleUsernameInput = (event: React.FormEvent<HTMLInputElement>) => {
    setUserNameExisted(false)
    debouncedInputTyping(event.currentTarget.value)
  };
  
  useEffect(() => {
    fetchCountryList();
  }, []);

  useEffect(() => {
    const authUsername = AuthStore.profile?.user_name
    if (authUsername) {
      setUsername(authUsername)
    }

}, []);
  return (
    <Modal
      title={<span className="font-[600]">Sign in info</span>}
      visible={isModalVisible}
      closable={false}
      footer={[
        <Button key={1} onClick={handleLogout}>Logout</Button>,
        <Button key={2} onClick={handleComplete} className="bg-gradient-1">Complete</Button>
      ]}
      className={s.signupInfoModal}
    >
      <h3 style={{ color: '#ffffff' }}>Enter the information below to finish the sign in process</h3>
      <Form
        form={form}
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        initialValues={{country_code: localUserInfo?.profile?.country_code, user_name: localUserInfo?.profile?.user_name}}
        autoComplete="off"
        onKeyUp={handleKeyUp}
      >
        <Form.Item
          label="Username"
          name="user_name"
          rules={[
            {
              required: true,
              message: "Please input your username!"
            },
            {
              min: 3,
              message: "Username must be minimum 3 characters."
            },
            {
              max: 16,
              message: "Username must be maximum 16 characters."
            },
            {
              pattern: /^[a-zA-Z0-9_]*$/g,
              message: "Valid characters are A-Z a-z 0-9 and _"
            },
            {
              async validator(rule, value) {
                if (userNameExisted) {
                  return Promise.reject('This username already exists.');
                }
              },
              validateTrigger: "onSubmit"
            },
          ]}
        >
          <Input placeholder="Enter username" onChange={handleUsernameInput} className={s.formFieldBg} autoComplete="false" />
        </Form.Item>
        <Form.Item
          label="Country"
          name="country_code"
          rules={[{required: true, message: 'Please select your country!'}]}
        >
          <Select
            showSearch
            filterOption={(input, option) => {
              return option?.key.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }}
            placeholder="Select country"
            className={`${s.formFieldBg} ${s.formFieldSelect}`}
            defaultValue={localUserInfo?.profile?.country_code}
          >
            {countryList.length > 0 && countryList.map(country => (
              <Option key={country.name} value={country.iso2}>
                <Image src={country.flag} preview={false} width="30px" height="auto"/>
                <span className="ml-3">
                  {country.name}
                </span>
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {required: true, message: 'Please input your password!'},
            {
              pattern: /^(?=.{8,32}$)(?=.*?[A-Za-z])(?=.*?[0-9])/g,
              message: "Use 8 to 32 characters with a mix of letters & numbers"
            },
            // ({ getFieldValue }) => ({
            //   validator(_, value) {
            //     if (!value || getFieldValue('confirmPassword') === value) {
            //       return Promise.resolve();
            //     }
            //     return Promise.reject(new Error('The two passwords that you entered do not match!'));
            //   },
            // }),
          ]}

        >
          <Input.Password placeholder="Enter password" className={s.formFieldBg} autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {required: true, message: 'Please input your confirm password!'},
            {
              pattern: /^(?=.{8,32}$)(?=.*?[a-zA-Z])(?=.*?[0-9])/g,
              message: "Use 8 to 32 characters with a mix of letters & numbers"
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
              validateTrigger: "onSubmit"
            }),
          ]}
        >
          <Input.Password placeholder="Enter confirm password" className={s.formFieldBg} autoComplete="off" />
        </Form.Item>
      </Form>
    </Modal>
  );
});
