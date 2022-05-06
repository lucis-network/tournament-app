import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Button, Col, Input, InputNumber, Modal, Row, Select, Form } from 'antd';
import CircleImage from 'components/ui/common/images/CircleImage';
import Text from 'antd/lib/typography/Text';
import TournamentStore from "../../../../../src/store/TournamentStore"
import { myBucket, S3_BUCKET } from 'components/ui/common/upload/UploadImage';
import { TiersSelectType } from './TournamentDetailSponsor';
import s from "../../../../../styles/tournament/sponsor/index.module.sass";
import { ApolloQueryResult } from '@apollo/client';

type TournamentDetailBecomeSponsorProps = {
  isBecome: boolean;
  setIsBecome: Dispatch<SetStateAction<boolean>>;
  tiersSelect: TiersSelectType[];
  refetch: () => Promise<ApolloQueryResult<any>>;
}

const { Option } = Select;

export default function TournamentDetailBecomeSponsor(props: TournamentDetailBecomeSponsorProps) {
  const { isBecome, setIsBecome, tiersSelect, refetch } = props;
  const [selectedTier, setSelectedTier] = useState(tiersSelect[0]);
  const [currentMinAmount, setCurrentMinAmount] = useState(tiersSelect[0].min_deposit)
  const [logoUrl, setLogoUrl] = useState('');
  const [form] = Form.useForm();
  const { uid: tierUid, min_deposit: minAmount, show_ads, show_name, is_full } = selectedTier;
  const inputFileRef = useRef<any>(null);
  const inputSponsorAmountRef = useRef<HTMLInputElement>(null);

  const handleFormUpdate = (data: any) => {
    // todo submit sponsor
    refetch();
    console.log('handleFormUpdate: ', data);
  }

  const handleTierChange = (value: string) => {
    const selected = tiersSelect.filter(item => item.uid === value)[0];
    setSelectedTier(selected);
    if (inputSponsorAmountRef.current && !inputSponsorAmountRef.current.value) {
      setCurrentMinAmount(selected.min_deposit);
    } else if (inputSponsorAmountRef.current && inputSponsorAmountRef.current.value) {
      form.validateFields(['amount'])
    }
  };

  const handleSponsorAmountChange = (value: number) => {
    if ((value !== null) && (value.toString().trim().length > 0)) {
      setCurrentMinAmount(value);
    } else {
      setCurrentMinAmount(minAmount);
    }
  };

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
      title="Become our sponsor"
      visible={isBecome}
      onCancel={() => setIsBecome(false)}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ disabled: is_full }}
      okText={`Sponsor with ${currentMinAmount} USDT`}
      onOk={() => {
        form
          .validateFields()
          .then(data => {
            data.logo = logoUrl;
            handleFormUpdate(data);
            setIsBecome(false)
          })
          .catch(error => {
            console.log('Validate Failed:', error);
          });
      }}
    >
      <Form
        form={form}
        initialValues={{
          amount: '',
          name: '',
          home_page: '',
          ads_video: '',
        }}
        validateTrigger="onChange"
        className={s.sponsorDetailForm}
      >
        <Row align="middle" className="mb-4">
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <label>Sponsor tier</label>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 16 }}>
            <Select
              style={{ width: '100%' }}
              defaultValue={tierUid}
              onChange={handleTierChange}
              status={is_full ? 'error' : ''}
            >
              {tiersSelect.map(tier => <Option key={tier.uid} value={tier.uid} disabled={tier.is_full}>{tier.name}</Option>)}
            </Select>
            {is_full && <div style={{ color: '#ff4d4f' }}>All slots have been occupied.</div>}
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
                  required: true,
                  message: 'Sponsor amount is required.'
                },
                {
                  type: 'number',
                  min: minAmount,
                  message: `Sponsor amount must be greater than ${minAmount} ${TournamentStore.currency_uid}.`
                }
              ]}
            >
              <InputNumber
                prefix="$"
                style={{ width: "100%" }}
                ref={inputSponsorAmountRef}
                min={0}
                max={999999999999999}
                placeholder={`Min ${minAmount} ${TournamentStore.currency_uid}`}
                onChange={handleSponsorAmountChange}
                disabled={is_full}
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
              <Col span={18} className="pl-2">
                <input
                  style={{ display: 'none' }}
                  type="file"
                  ref={inputFileRef}
                  onChange={handleFileInput}
                  accept="image/png, image/jpeg, image/gif"
                  disabled={is_full}
                />
                <Button onClick={() => inputFileRef.current?.click()} className="mb-2" disabled={is_full}>Upload logo</Button>
                <Text style={{ color: '#ffffff', fontSize: 12, display: 'block' }}>Recommended size: 200x200px</Text>
              </Col>
            </Row>
          </Col>
        </Row>
        {show_name && (
          <Row align="middle" className="mb-4">
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <label>Name</label>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 16 }}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Sponsor name is required.'
                  },
                ]}
              >
                <Input placeholder="Sponsor name" maxLength={45} disabled={is_full} />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row align="middle" className="mb-4">
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <label>Home page</label>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 16 }}>
            <Form.Item
              name="home_page"
              rules={[
                {
                  required: true,
                  message: 'Home page is required.'
                },
                {
                  type: 'url',
                  message: 'Not a valid url',
                },
              ]}
            >
              <Input placeholder="https://..." disabled={is_full} />
            </Form.Item>
          </Col>
        </Row>
        {show_ads && (
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
                <Input placeholder="https://youtube.com/v/12345678" disabled={is_full} />
              </Form.Item>
              <Text italic className="mb-0" style={{ color: '#ffffff', fontSize: 14 }}>
                This ads video will be display on the tournament detail screen {">"} Cover Section
              </Text>
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  );
};
