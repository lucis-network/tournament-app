import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Button,
  Col,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Form, Image,
} from "antd";
import { observer } from "mobx-react";
import CircleImage from "components/ui/common/images/CircleImage";
import Text from "antd/lib/typography/Text";
import TournamentStore from "../../../../../src/store/TournamentStore";
import { myBucket, S3_BUCKET } from "components/ui/common/upload/UploadImage";
import { ISponsorSlot, SponsorSlot, SponsorTierStore } from "./SponsorStore";
import s from "./index.module.sass";

type SponsorDetailProps = {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  tier: SponsorTierStore;
  min_deposit?: number;
  slot: SponsorSlot;
  show_ads?: boolean;
  tier_ids: string[];
  minAmountInit: number;
  index: number;
};

const { Option } = Select;

export default observer(function SponsorDetail(props: SponsorDetailProps) {
  const {
    isEdit,
    setIsEdit,
    tier,
    min_deposit,
    slot,
    show_ads,
    tier_ids,
    minAmountInit,
    index,
  } = props;

  const [logoUrl, setLogoUrl] = useState("");
  const [form] = Form.useForm();
  const inputFileRef = useRef<any>(null);
  const [isCheck, setIsCheck] = useState(false);
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    if (tier?.slots[index]?.logo) {
      //@ts-ignore
      setLogoUrl(tier?.slots[index]?.logo);
    }

    if (!form.getFieldValue("name")) setIsCheck(true);
  }, [tier]);

  const handleFormUpdate = (data: any) => {
    if (!data.logo) {
      setMessageError("Logo is required");
      return;
    }

    const newSlotState: ISponsorSlot = {};

    newSlotState.logo = data.logo;
    newSlotState.ads_link = data.ads_video;
    newSlotState.amount = data.amount;
    newSlotState.home_page = data.home_page;
    newSlotState.name = data.name;
    slot.setState(newSlotState);

    setIsEdit(false);
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
      Key: 'tournaments/' + file.name,
      ContentType: "image/jpeg",
    };

    myBucket.putObject(params).send((err, data) => {
      var s3url = myBucket.getSignedUrl("getObject", { Key: params.Key });
      const str = s3url.split("?")[0];
      setLogoUrl(str);

      if (str) setMessageError("");
    });
  };

  const doSave = () => {
    form
      .validateFields()
      .then((data) => {
        data.logo = logoUrl;
        console.log(data.logo);
        handleFormUpdate(data);
      })
      .catch((error) => {
        //console.log("Validate Failed:", error);
      });
  };

  const doDelete = () => {
    // setLogoUrl("");
    // form.setFieldsValue({
    //   name: "",
    //   amount: "",
    //   home_page: "",
    // });
    const newSlotState: ISponsorSlot = {};

    newSlotState.logo = "";
    newSlotState.ads_link = "";
    //@ts-ignore
    newSlotState.amount = "";
    newSlotState.home_page = "";
    newSlotState.name = "";
    slot.setState(newSlotState);
    setIsEdit(false);
  };

  return (
    <Modal
      title="Add existing sponsor"
      visible={isEdit}
      onCancel={() => setIsEdit(false)}
      //cancelButtonProps={{ style: { display: "none" } }}
      footer={null}
      okText="Update"
      cancelText="Delete"
      className={s.becomeSponsor}
      // onOk={() => {
      //   form
      //     .validateFields()
      //     .then((data) => {
      //       data.logo = logoUrl;
      //       handleFormUpdate(data);
      //       setIsEdit(false);
      //     })
      //     .catch((error) => {
      //       console.log("Validate Failed:", error);
      //     });
      // }}
    >
      <Form
        form={form}
        initialValues={{
          amount: slot?.amount,
          name: slot?.name || "",
          home_page: slot?.home_page || "",
          ads_video: slot?.ads_link || "",
        }}
        className={s.sponsorDetailForm}
      >
        <Row align="middle" className="mb-4">
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <label>Sponsor tier</label>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 16 }}>
            <Select
              style={{ width: "100%" }}
              defaultValue={tier.tier_id}
              disabled
              className={`${s.formFieldBg} ${s.formFieldSelect}`}
            >
              {tier_ids.map((id) => (
                <Option key={tier.tier_id} value={id}>
                  {tier.name}
                </Option>
              ))}
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
              // rules={[
              //   {
              //     type: 'number',
              //     min: min_deposit,
              //     message: `Sponsor amount must be greater than \${min} ${TournamentStore.currency_uid}.`
              //   }
              // ]}
            >
              <InputNumber
                prefix="$"
                style={{ width: "100%" }}
                min={0}
                max={999999999999999}
                placeholder={`Sponsor amount`}
                className={`${s.formFieldBg} ${s.formFieldNumber}`}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row align="middle" className="mb-4">
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <label>Logo</label>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 16 }}>
            <div className={s.logoRow}>
              {logoUrl ? (
                <Image src={logoUrl} preview={false} alt="" className={`${s.previewLogo} ${s.logoUploaded}`} />
              ) : (
                <Image src="/assets/avatar.jpg" preview={false} alt="" className={s.previewLogo} />
              )}
              <div className={s.logoUpload}>
                <input
                  style={{ display: "none" }}
                  type="file"
                  ref={inputFileRef}
                  onChange={handleFileInput}
                  accept="image/png, image/jpeg, image/gif"
                />
                <Button
                  onClick={() => inputFileRef.current?.click()}
                  className={s.btnConfirm}
                >
                  Upload logo
                </Button>
                {/*<Text*/}
                {/*  style={{ color: "#ffffff", fontSize: 12, display: "block" }}*/}
                {/*>*/}
                {/*  Recommended size: 200x200px*/}
                {/*</Text>*/}
                <div className={s.message_error}>{messageError}</div>
              </div>
            </div>
          </Col>
        </Row>
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
                  message: "Sponsor name is required.",
                },
                {
                  max: 45,
                  message: "Sponsor name must be maximum 45 characters.",
                },
              ]}
            >
              <Input
                placeholder="Sponsor name"
                className={s.formFieldBg}
              />
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
                  type: "url",
                  message: "Not a valid url",
                },
              ]}
            >
              <Input
                placeholder="https://..."
                className={s.formFieldBg}
              />
            </Form.Item>
          </Col>
        </Row>
        {show_ads && (
          <Row align="middle">
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <label>Ads Video</label>
              <br></br>
              <span style={{ color: "white" }}>(Coming soon)</span>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 16 }}>
              <Text strong style={{ color: "#ffffff", fontSize: 12 }}>
                Youtube ads url
              </Text>
              <Form.Item
                name="ads_video"
                rules={[
                  {
                    type: "url",
                    message: "Not a valid url",
                  },
                ]}
              >
                <Input
                  placeholder="https://youtube.com/v/12345678"
                  disabled={true}
                />
              </Form.Item>
              <Text
                italic
                className="mb-0"
                style={{ color: "#ffffff", fontSize: 14 }}
              >
                This ads video will be display on the tournament detail screen{" "}
                {">"} Cover Section
              </Text>
            </Col>
          </Row>
        )}
        <Row className={s.btn}>
          <Col>
            <Button className={s.btnCancel} onClick={doDelete} disabled={isCheck}>
              Delete
            </Button>
          </Col>
          <Col>
            <Button className={s.btnConfirm} onClick={doSave}>
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});
