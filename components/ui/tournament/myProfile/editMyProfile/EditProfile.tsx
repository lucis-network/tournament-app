import s from "./EditProfile.module.sass";
import {Button, Col, Form, Input, Row, Select} from "antd";
import {InfoCircleOutlined, LinkOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import React, {useEffect, useRef, useState} from "react";
import {result} from "lodash";
import {useVerifyEmail} from "../../../../../hooks/myProfile/useMyProfile";
import AuthStore from "../../../../Auth/AuthStore";
import {observer} from "mobx-react-lite";

export default observer(function EditProfile() {
  const userInfo = AuthStore;
  console.log('userInfo: ', userInfo)
  const [newProfileData, setNewProfileData] = useState<any>([]);
  const [emailValue, setEmailValue] = useState<string>('');
  const { verifyEmail } = useVerifyEmail({
    email: emailValue
  });
  const [form] = Form.useForm();
  const emailRef = useRef<HTMLInputElement>(null)
  const { Option } = Select;

  const handleRegionChange = () => {

  }

  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    const regex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,256}$/g
    if (regex.test(event.currentTarget.value)) {
      setEmailValue(event.currentTarget.value)
    } else {
      setEmailValue('')
    }
  }

  const handleVerifyEmail = () => {
    verifyEmail().then(result => {
      console.log('handleVerifyEmail: ', result)
    }).catch(error => {
      console.log('handleVerifyEmail: ', error)
    })
  }

  const handleSaveChange = () => {
    form.validateFields()
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className={s.editProfile}>
      <Form
        form={form}
        initialValues={{
          user_name: userInfo.profile.user_name,
          display_name: userInfo.profile.display_name,
          email: userInfo.email
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
            <div className="flex" style={{ alignItems: 'end' }}>
              <Form.Item
                label="Email"
                name="email"
                labelCol={{ span: 24 }}
                style={{ marginBottom: 0 }}
                rules={[
                  {
                    type: "email",
                    message: 'Not a valid email.',
                  }
                ]}
              >
                <Input placeholder="Enter email" onChange={handleEmailChange} />
              </Form.Item>
              {(userInfo.email && (userInfo.email?.length <= 0)) && <Button onClick={handleVerifyEmail} disabled={emailValue.length <= 0}>Verify</Button>}
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
              name="phone"
              labelCol={{ span: 24 }}
            >
              <Select
                value={""}
                style={{ width: 80, margin: '0 8px 0 0' }}
                onChange={handleRegionChange}
              >
                <Option value="rmb">RMB</Option>
                <Option value="dollar">Dollar</Option>
              </Select>
              <Input placeholder="Enter phone number" />
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
        <div className="text-center">
          <Button onClick={handleSaveChange}>Save change</Button>
        </div>
      </Form>
    </div>
  );
})
