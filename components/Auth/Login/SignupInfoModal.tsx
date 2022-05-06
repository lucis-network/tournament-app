import {Button, Form, Image, Input, Modal, Select} from "antd";
import LoginBoxStore from "./LoginBoxStore";
import { getLocalAuthInfo, setLocalAuthInfo } from "../AuthLocal";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import s from "./Login.module.sass"
import { gql, useMutation } from "@apollo/client";
import { debounce } from "lodash";
import AuthService from "../AuthService";

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

export default observer(function SignupInfoModal(props: SignupInfoModalProps) {
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [updateProfileMutation] = useMutation(UPDATE_PROFILE);
  const isModalVisible = LoginBoxStore.signupInfoModalVisible,
    setIsModalVisible = (value: boolean) => (LoginBoxStore.signupInfoModalVisible = value);
  const [form] = Form.useForm();
  const { Option } = Select;

  const fetchCountryList = (): void => {
    fetch('https://countriesnow.space/api/v0.1/countries/flag/images', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(result => setCountryList(result.data))
      .catch(error => console.log('error fetchCountryList', error));
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
                  set: values.user_name
                },
                country_code: values.country_code,
              }
            }
          });
          const { user_name, country_code } = response.data.updateProfile;
          const user = getLocalAuthInfo()!;

          if (user && user.profile) {
            user.profile.user_name = user_name;
            user.profile.country_code = country_code;
            setLocalAuthInfo(user);
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
    debounce((value) => {
      // chaupa todo check if username already exists
      console.log(value);
    }, 500),
    []
  );

  const handleUsernameInput = (event: React.FormEvent<HTMLInputElement>) => {
    debouncedInputTyping(event.currentTarget.value)
  };
  
  useEffect(() => {
    fetchCountryList();
  }, []);

  return (
    <Modal
      title={<span className="font-[600]">Sign up info</span>}
      visible={isModalVisible}
      closable={false}
      footer={[
        <Button key={1} onClick={handleLogout}>Logout</Button>,
        <Button key={2} onClick={handleComplete} className={s.btnComplete}>Complete</Button>
      ]}
      className={s.signupInfoModal}
    >
      <h3 style={{ color: '#ffffff' }}>Enter the information below to finish the signup process</h3>
      <Form
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        initialValues={{ country_code: null }}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="user_name"
          rules={[
            {
              required: true,
              message: 'Please input your username!'
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
              pattern: /^[a-zA-Z0-9]*$/g,
              message: "Valid characters are A-Z a-z 0-9."
            }
          ]}
        >
          <Input placeholder="Enter username" onChange={handleUsernameInput} />
        </Form.Item>
        <Form.Item
          label="Country"
          name="country_code"
          rules={[{ required: true, message: 'Please select your country!' }]}
        >
          <Select
            showSearch
            filterOption={(input, option) => {
              return option?.key.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }}
            placeholder="Select country"
          >
            {countryList.length > 0 && countryList.map(country => (
              <Option key={country.name} value={country.iso2}>
                <Image src={country.flag} width="30px" height="auto" />
                <span className="ml-3">
                  {country.name}
                </span>
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
});
