import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Button, Col, Input, InputNumber, Modal, Row, Select, Form, Upload } from 'antd';
import { observer } from 'mobx-react';
import CircleImage from 'components/ui/common/images/CircleImage';
import Text from 'antd/lib/typography/Text';
import { SponsorSlotType } from 'src/store/TournamentStore';
import TournamentStore from "../../../../../src/store/TournamentStore"
import { myBucket, S3_BUCKET } from 'components/ui/common/upload/UploadImage';
import { ISponsorSlot, SponsorSlot } from "./SponsorStore";

type SponsorDetailProps = {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  tier_name?: string;
  min_deposit?: number;
  slot: SponsorSlot;
}

const { Option } = Select;

export default observer(function SponsorDetail(props: SponsorDetailProps) {
  const {isEdit, setIsEdit, tier_name, min_deposit, slot} = props;
  const [logoUrl, setLogoUrl] = useState('');
  const [form] = Form.useForm();
  const inputFileRef = useRef<any>(null)

  const handleFormUpdate = (data: any) => {
    // console.log('{handleFormUpdate} data: ', data);
    const newSlotState: ISponsorSlot = {}
    if (data.logo) {
      newSlotState.logo = data.logo;
    }
    if (data.ads_video) {
      newSlotState.ads_link = data.ads_video;
    }
    if (data.amount) {
      newSlotState.amount = data.amount;
    }
    if (data.home_page) {
      newSlotState.home_page = data.home_page;
    }
    if (data.name) {
      newSlotState.name = data.name;
    }
    slot.setState(newSlotState)
  }

  const handleFileInput = (e: any) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file: any) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
      ContentType: "image/jpeg",
    };

    myBucket
      .putObject(params)
      .send((err, data) => {
        var s3url = myBucket.getSignedUrl("getObject", { Key: params.Key });
        const str = s3url.split("?")[0];
        setLogoUrl(str);
      });
  };

  return (
    <Modal
      title="Add existing sponsor"
      visible={isEdit}
      onCancel={() => setIsEdit(false)}
      cancelButtonProps={{ style: { display: 'none' } }}
      okText="Update"
      onOk={() => {
        form
          .validateFields()
          .then(data => {
            data.logo = logoUrl;
            handleFormUpdate(data);
            setIsEdit(false)
          })
          .catch(error => {
            console.log('Validate Failed:', error);
          });
      }}
    >
      <Form
        form={form}
        onFinish={handleFormUpdate}
        initialValues={{
          amount: slot?.amount || min_deposit,
          name: slot?.name || '',
          home_page: slot?.home_page || '',
          ads_video: slot?.ads_link || '',
        }}
      >
        <Row align="middle" className="mb-4">
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <label>Sponsor tier</label>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 16 }}>
            <Select
              style={{ width: '100%' }}
              defaultValue={tier_name}
              disabled
            >
              <Option value="Diamond">Diamond</Option>
              <Option value="Gold">Gold</Option>
              <Option value="Silver">Silver</Option>
              <Option value="Enthusiast">Enthusiast</Option>
            </Select>
          </Col>
        </Row>
        <Row align="middle" className="mb-4">
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <label>Sponsor amount</label>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 16 }}>
            <Form.Item
              name="amount"
              rules={[
                {
                  type: 'number',
                  min: min_deposit,
                  message: `You need to enter a value greater than \${min} ${TournamentStore.currency_uid}.`
                }
              ]}
            >
              <InputNumber
                prefix="$"
                style={{ width: "100%" }}
                min="0"
                placeholder={`Min 5,000 ${TournamentStore.currency_uid}`}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row align="middle" className="mb-4">
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <label>Logo</label>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 16 }}>
            <Row>
              <Col span={6} className="pr-2">
                <CircleImage src={logoUrl || '/assets/avatar.jpg'} />
              </Col>
              <Col span={18}>
                <input
                  style={{ display: 'none' }}
                  type="file"
                  ref={inputFileRef}
                  onChange={handleFileInput}
                  accept="image/png, image/jpeg, image/gif"
                />
                <Button onClick={() => inputFileRef.current?.click()}>Upload logo</Button>
                <Text style={{ color: '#ffffff', fontSize: 12, display: 'block' }}>Recommended size: 200x200px</Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row align="middle" className="mb-4">
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <label>Name</label>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 16 }}>
            <Form.Item
              name="name"
            >
              <Input placeholder="Sponsor name" maxLength={45} />
            </Form.Item>
          </Col>
        </Row>
        <Row align="middle" className="mb-4">
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <label>Home page</label>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 16 }}>
            <Form.Item
              name="home_page"
              rules={[
                {
                  type: 'url',
                  message: 'Not a valid url',
                }
              ]}
            >
              <Input placeholder="https://..." />
            </Form.Item>
          </Col>
        </Row>
        <Row align="middle">
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <label>Ads Video</label>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 16 }}>
            <Text strong style={{ color: '#ffffff', fontSize: 12 }}>Youtube ads url</Text>
            <Form.Item
              name="ads_video"
              rules={[
                {
                  type: 'url',
                  message: 'Not a valid url',
                }
              ]}
            >
              <Input placeholder="https://youtube.com/v/12345678" />
            </Form.Item>
            <Text italic className="mb-0" style={{ color: '#ffffff', fontSize: 14 }}>
              This ads video will be display on the tournament detail screen {">"} Cover Section
            </Text>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
})
