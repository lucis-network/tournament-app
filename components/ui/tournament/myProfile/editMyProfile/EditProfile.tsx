import s from "./EditProfile.module.sass";
import {Button, Col, Form, Input, InputNumber, message, Row, Select, Space} from "antd";
import {InfoCircleOutlined, LinkOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useUpdateProfile, useVerifyEmail} from "../../../../../hooks/myProfile/useMyProfile";
import {observer} from "mobx-react-lite";
import debounce from "lodash/debounce";
import {ProfileUpdateInput, UserGraphql} from "../../../../../src/generated/graphql";
import {isEmpty} from "lodash";
import {ApolloQueryResult} from "@apollo/client";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { isPhoneNumber } from 'class-validator';

type EditProfileProps = {
  userInfo: UserGraphql,
  getUserProfileRefetch: () => Promise<ApolloQueryResult<any>>,
};

type CountryOption = {
  name: string,
  code: string,
  dial_code: string,
}

export default observer(function EditProfile({ userInfo, getUserProfileRefetch }: EditProfileProps) {
  const [newProfileData, setNewProfileData] = useState<ProfileUpdateInput>({});
  const [emailValue, setEmailValue] = useState<string>('');
  const [countryData, setCountryData] = useState<CountryOption[]>([]);
  const [phone, setPhone] = useState<string>(userInfo?.profile?.phone as string);
  const { verifyEmail } = useVerifyEmail({
    email: emailValue
  });
  const { updateProfile } = useUpdateProfile({
    data: newProfileData
  });
  const [form] = Form.useForm();
  const emailRef = useRef<HTMLInputElement>(null);
  const { Option } = Select;

  const handleRegionChange = (data: any) => {
    console.log(data)
  }

  const fetchCountryList = async (): Promise<any> => {
    try {
      return await fetch('https://countriesnow.space/api/v0.1/countries/codes/', {
        method: 'GET'
      });
    } catch (error) {
      console.log('error fetchCountryList: ', error)
    }
  }

  const debouncedSetEmail = useCallback(
    debounce((fn: React.Dispatch<React.SetStateAction<string>>, value: string) => {
      fn(value);
    }, 500),
    []
  );

  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    const regex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,256}$/g
    if (regex.test(event.currentTarget.value)) {
      debouncedSetEmail(setEmailValue, event.currentTarget.value)
    } else {
      debouncedSetEmail(setEmailValue, '')
    }
  }

  const handleVerifyEmail = () => {
    verifyEmail().then(result => {
      message.success('An email has been sent. Please check your inbox.')
    }).catch(error => {
      console.log('handleVerifyEmail: ', error.message, error.code)
    })
  }

  const handleSaveChange = () => {
    form.validateFields()
      .then(result => {
        let formattedPhone = '';
        if (result.phone && result.dial_code) {
          const dialCode = countryData.filter(country => country.code === result.dial_code)[0].dial_code;
          formattedPhone = dialCode + result.phone
        }

        const newResult = {
          user_name: {
            set: result.user_name ?? ''
          },
          display_name: {
            set: result.display_name ?? ''
          },
          twitter: {
            set: result.twitter ?? ''
          },
          facebook: {
            set: result.facebook ?? ''
          },
          // telegram: {
          //   set: result.telegram ?? ''
          // },
          twitch: {
            set: result.twitch ?? ''
          },
          discord: {
            set: result.discord ?? ''
          },
          youtube: {
            set: result.youtube ?? ''
          },
          phone: {
            set: !phone.includes('+') ? '+' + phone : phone
          },
          biography: {
            set: result.biography ?? ''
          },
        }
        setNewProfileData(newResult)
      })
      .catch(error => {
        console.log(error)
      });
  }

  const handlePhoneChange = (phone: string) => {
    console.log(phone)
  }

  useEffect(() => {
    let isSubscribed = true;

    fetchCountryList()
      .then(response => response.json())
      .then(result => {
        if (isSubscribed) {
          const sortedData = result.data.sort((a: any, b: any) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
          setCountryData(sortedData);
        }
      })
      .catch(error => {
        console.log(error)
      })

    return () => {
      isSubscribed = false
    }
  }, [])

  useEffect(() => {
    if (!isEmpty(newProfileData)) {
      updateProfile()
        .then(response => {
          getUserProfileRefetch()
        })
        .catch(error => {
          console.log('updateProfile error: ', error)
        })
    }
  }, [newProfileData])

  return (
    <div className={s.editProfile}>
      <Form
        form={form}
        initialValues={{
          user_name: !isEmpty(userInfo?.profile?.user_name) ? userInfo?.profile?.user_name : '',
          display_name: !isEmpty(userInfo?.profile?.display_name) ? userInfo.profile?.display_name : (userInfo?.profile?.user_name ?? ''),
          email: !isEmpty(userInfo?.email) ? userInfo?.email : '',
          biography: !isEmpty(userInfo?.profile?.biography) ? userInfo?.profile?.biography : '',
          facebook: !isEmpty(userInfo?.profile?.facebook) ? userInfo?.profile?.facebook : '',
          twitter: !isEmpty(userInfo?.profile?.twitter) ? userInfo?.profile?.twitter : '',
          // telegram: !isEmpty(userInfo?.profile?.telegram) ? userInfo?.profile?.telegram : '',
          twitch: !isEmpty(userInfo?.profile?.twitch) ? userInfo?.profile?.twitch : '',
          discord: !isEmpty(userInfo?.profile?.discord) ? userInfo?.profile?.discord : '',
          youtube: !isEmpty(userInfo?.profile?.youtube) ? userInfo?.profile?.youtube : '',
          dial_code: !isEmpty(userInfo?.profile?.country_code) ? userInfo?.profile?.country_code : '',
          phone: !isEmpty(userInfo?.profile?.phone) ? userInfo?.profile?.phone : '',
        }}
      >
        <Row gutter={30}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <h3>
              <InfoCircleOutlined />
              Player info
            </h3>
            <Form.Item
              label="User name"
              name="user_name"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: 'Username is required',
                },
                {
                  min: 3,
                  message: 'This field must be minimum ${min} characters',
                },
                {
                  max: 45,
                  message: 'This field must be maximum ${max} characters',
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Display name"
              name="display_name"
              labelCol={{ span: 24 }}
              rules={[
                {
                  max: 45,
                  message: 'This field must be maximum ${max} characters',
                }
              ]}
            >
              <Input />
            </Form.Item>
            <div className={s.emailFieldWrap}>
              <Form.Item
                label="Email"
                name="email"
                labelCol={{ span: 24 }}
                style={{ marginBottom: 0 }}
                className={s.emailField}
                rules={[
                  {
                    type: "email",
                    message: 'Not a valid email.',
                  }
                ]}
              >
                <Input placeholder="Enter email" onChange={handleEmailChange} />
              </Form.Item>
              <Button
                onClick={handleVerifyEmail}
                disabled={(emailValue.length <= 0) || (emailValue === userInfo.email)}
                className={s.btnVerify}
              >
                Verify
              </Button>
            </div>
            <Form.Item
              label="Biography"
              name="biography"
              labelCol={{ span: 24 }}
            >
              <TextArea placeholder="Enter biography" />
            </Form.Item>
            <Form.Item
              label="Phone"
              labelCol={{ span: 24 }}
            >
              <PhoneInput
                country={`${userInfo?.profile?.country_code?.toLowerCase()}`}
                enableSearch
                value={phone}
                // isValid={(value) => {
                //   return isPhoneNumber(value)
                // }}
                onChange={(phone) => setPhone(phone)}
                placeholder="Enter phone number"
              />
              {/*<Row>*/}
              {/*  <Col span={8}>*/}
              {/*    <Form.Item name="dial_code">*/}
              {/*      <Select*/}
              {/*        showSearch*/}
              {/*        filterOption={(input, option) => {*/}
              {/*          return option?.key.toLowerCase().indexOf(input.toLowerCase()) >= 0*/}
              {/*        }}*/}
              {/*        onChange={handleRegionChange}*/}
              {/*      >*/}
              {/*        {countryData.length > 0 && countryData.map((item: CountryOption) => (*/}
              {/*          <Option key={item.name} value={item.code}>{item.name} {item.dial_code}</Option>*/}
              {/*        ))}*/}
              {/*      </Select>*/}
              {/*    </Form.Item>*/}
              {/*  </Col>*/}
              {/*  <Col span={16}>*/}
              {/*    <Form.Item*/}
              {/*      name="phone"*/}
              {/*    >*/}
              {/*      <InputNumber controls={false} type="number" placeholder="Enter phone number" style={{ width: "100%" }} />*/}
              {/*    </Form.Item>*/}
              {/*  </Col>*/}
              {/*</Row>*/}
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <h3>
              <LinkOutlined />
              Social links
            </h3>
            <Form.Item
              label="Facebook"
              name="facebook"
              labelCol={{ span: 24 }}
              rules={[
                {
                  type: 'url',
                  message: 'Invalid URL',
                }
              ]}
            >
              <Input placeholder="Enter facebook link" />
            </Form.Item>
            <Form.Item
              label="Twitter"
              name="twitter"
              labelCol={{ span: 24 }}
              rules={[
                {
                  type: 'url',
                  message: 'Invalid URL',
                }
              ]}
            >
              <Input placeholder="Enter twitter link" />
            </Form.Item>
            <Form.Item
              label="Discord"
              name="discord"
              labelCol={{ span: 24 }}
              rules={[
                {
                  type: 'url',
                  message: 'Invalid URL',
                }
              ]}
            >
              <Input placeholder="Enter discord link" />
            </Form.Item>
            <Form.Item
              label="Twitch"
              name="twitch"
              labelCol={{ span: 24 }}
              rules={[
                {
                  type: 'url',
                  message: 'Invalid URL',
                }
              ]}
            >
              <Input placeholder="Enter twitch link" />
            </Form.Item>
            <Form.Item
              label="Youtube"
              name="youtube"
              labelCol={{ span: 24 }}
              rules={[
                {
                  type: 'url',
                  message: 'Invalid URL',
                }
              ]}
            >
              <Input placeholder="Enter youtube link" />
            </Form.Item>
            <Button disabled>Link to discord</Button>
          </Col>
        </Row>
        <div className="text-center mt-5">
          <Button onClick={handleSaveChange}>Save change</Button>
        </div>
      </Form>
    </div>
  );
});
