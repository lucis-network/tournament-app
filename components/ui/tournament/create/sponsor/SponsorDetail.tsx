import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Col, Input, InputNumber, Modal, Row, Select } from 'antd';
import { observer } from 'mobx-react';
import CircleImage from 'components/ui/common/images/CircleImage';
import Text from 'antd/lib/typography/Text';

type SponsorDetailProps = {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  tier?: string;
}

export default observer(function SponsorDetail(props: SponsorDetailProps) {
  const { isEdit, setIsEdit, tier } = props;

  return (
    <Modal
      title="Sponsor Detail"
      visible={isEdit}
      onCancel={() => setIsEdit(false)}
      cancelButtonProps={{ style: { display: 'none' } }}
      okText="Update"
    >
      <Row align="middle" className="mb-4">
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <label>Sponsor tier</label>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 16 }}>
          <Select defaultValue={tier} style={{ width: '100%' }} />
        </Col>
      </Row>
      <Row align="middle" className="mb-4">
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <label>Sponsor amount</label>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 16 }}>
          <InputNumber
            type="number"
            prefix="$"
            style={{ width: "99%" }}
            min={5000}
            placeholder="min 5,000 USDT"
          />
        </Col>
      </Row>
      <Row align="middle" className="mb-4">
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <label>Logo</label>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 16 }}>
          <Row>
            <Col span={6}>
              <CircleImage src="/assets/avatar.jpg" />
            </Col>
            <Col span={18}>
              <Button>Upload logo</Button>
              <Text style={{ color: '#ffffff', fontSize: 12, display: 'block' }}>Recommended size: 100x100px</Text>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row align="middle" className="mb-4">
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <label>Name</label>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 16 }}>
          <Input defaultValue="Lucis" maxLength={45} />
        </Col>
      </Row>
      <Row align="middle" className="mb-4">
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <label>Home page</label>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 16 }}>
          <Input defaultValue="https://..." />
        </Col>
      </Row>
      <Row align="middle">
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <label>Ads Video</label>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 16 }}>
          <Text strong style={{ color: '#ffffff', fontSize: 12 }}>Youtube ads url</Text>
          <Input defaultValue="https://youtube.com/v/12345678" />
          <Text italic className="mb-0" style={{ color: '#ffffff', fontSize: 14 }}>
            This ads video will be display on the tournament detail screen {">"} Cover Section
          </Text>
        </Col>
      </Row>
    </Modal>
  );
})
