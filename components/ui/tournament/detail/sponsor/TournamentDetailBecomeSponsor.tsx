import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  Button,
  Col,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Form,
  message,
} from "antd";
import Text from "antd/lib/typography/Text";
import { myBucket, S3_BUCKET } from "components/ui/common/upload/UploadImage";
import { TiersSelectType } from "./TournamentDetailSponsor";
import s from "../../../../../styles/tournament/sponsor/index.module.sass";
import AuthBoxStore from "components/Auth/components/AuthBoxStore";
import ConnectWalletStore, {
  nonReactive as ConnectWalletStore_NonReactiveData,
} from "components/Auth/ConnectWalletStore";
import EthersService from "../../../../../services/blockchain/Ethers";
import {
  useGetContract,
  useGetConfigFee,
} from "hooks/tournament/useCreateTournament";
import TournamentService from "components/service/tournament/TournamentService";
import AuthStore from "components/Auth/AuthStore";
import { SponsorCreateInputGql } from "src/generated/graphql";
import BigNumber from "bignumber.js";
import { format } from "utils/Number";

type TournamentDetailBecomeSponsorProps = {
  isBecome: boolean;
  setIsBecome: Dispatch<SetStateAction<boolean>>;
  tiersSelect: TiersSelectType[];
  refetchSponsor?: any;
  tournamentId?: string;
  refetchTounament?: any;
  currency?: any;
};

const { Option } = Select;

export type SponsorInput = {
  logo: string;
  name: string;
  home_page: string;
  ads_link: string;
  amount: number;
  sponsor_slot_uid: string;
  tx_hash: string;
};

export default function TournamentDetailBecomeSponsor(
  props: TournamentDetailBecomeSponsorProps
) {
  const { getContract } = useGetContract({});
  const { getConfigFee } = useGetConfigFee({});
  const {
    isBecome,
    setIsBecome,
    tiersSelect,
    refetchSponsor,
    tournamentId,
    refetchTounament,
    currency,
  } = props;
  const [selectedTier, setSelectedTier] = useState(tiersSelect[0]);
  const [currentMinAmount, setCurrentMinAmount] = useState(
    tiersSelect[0].min_deposit
  );
  const [logoUrl, setLogoUrl] = useState("");
  const [form] = Form.useForm();
  const {
    uid: tierUid,
    min_deposit: minAmount,
    show_ads,
    show_name,
    is_full,
  } = selectedTier;
  const inputFileRef = useRef<any>(null);
  const inputSponsorAmountRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [totalPayment, setTotalPayment] = useState(0);
  const handleFormUpdate = async (data: any) => {
    if (!data.logo) {
      setMessageError("Logo is required");
      return;
    }

    // todo submit sponsor
    let sponsor: SponsorCreateInputGql = {
      logo: data.logo,
      name: data.name ? data.name : "",
      home_page: data.home_page,
      ads_link: data.ads_link ? data.ads_link : "",
      amount: data.amount,
      sponsor_slot_uid: selectedTier.uid,
      tx_hash: "",
    };

    const txHash = await transferSponsors(data.amount);
    if (txHash) {
      sponsor.tx_hash = txHash;
      let tournamentService = new TournamentService();
      const response = tournamentService.becomeSponsor(sponsor).then((res) => {
        if (res) {
          // setIsPopupNotify(true);
          if (res) {
            message.success("You have become our sponsor");
            setIsBecome(false);
            refetchSponsor();
            refetchTounament();
          }
        }
      });
    }
  };

  const transferSponsors = async (amount: any) => {
    if (!ConnectWalletStore.address) {
      AuthBoxStore.connectModalVisible = true;
    } else {
      let result = await transfer(amount);
      setIsLoading(false);
      if (!result?.error) {
        return result?.txHash;
      } else {
        //@ts-ignore
        message.error(result?.error?.message);
      }
    }
  };

  const transfer = async (amount: any) => {
    setIsLoading(true);

    if (ConnectWalletStore_NonReactiveData.web3Provider) {
      //throw makeError("Need to connect your wallet first");
      const ethersService = new EthersService(
        ConnectWalletStore_NonReactiveData.web3Provider
      );

      let token_address = currency?.address;

      const contractAddress = getContract.filter(
        (item: any) => item.type === "PRIZE"
      );

      if (!AuthStore.id) {
        console.log("User not exist in store");
        return;
      }

      const getMyAllowance = await ethersService.getMyAllowanceOf(
        contractAddress[0]?.address,
        token_address
      );

      let bool = false;

      const totalAmount = new BigNumber(Number(amount))
        .multipliedBy(Math.pow(10, 18))
        .toFormat({ groupSeparator: "" });

      if (getMyAllowance && getMyAllowance < Number(totalAmount)) {
        bool = await ethersService.requestApproval(
          contractAddress[0]?.address,
          token_address
        );
      } else {
        bool = true;
      }

      if (bool) {
        const result = await ethersService.becomeSponsor(
          AuthStore.id + "",
          tournamentId as string,
          amount,
          token_address,
          contractAddress[0]?.address
        );
        return result;
      }
    }
  };

  const handleTierChange = (value: string) => {
    const selected = tiersSelect.filter((item) => item.uid === value)[0];
    setSelectedTier(selected);
    if (inputSponsorAmountRef.current && !inputSponsorAmountRef.current.value) {
      setCurrentMinAmount(selected.min_deposit);
    } else if (
      inputSponsorAmountRef.current &&
      inputSponsorAmountRef.current.value
    ) {
      form.validateFields(["amount"]);
    }
  };

  const handleSponsorAmountChange = (value: number) => {
    if (value !== null && value.toString().trim().length > 0) {
      setCurrentMinAmount(value);
      setTotalPayment(calTotalPayment(value));
    } else {
      setCurrentMinAmount(minAmount);
      setTotalPayment(calTotalPayment(minAmount));
    }
  };

  const calTotalPayment = (value: number) => {
    return (
      (value *
        (100 +
          (getConfigFee
            ? getConfigFee[0]?.tn_lucis_fee * 100 +
              getConfigFee[0]?.tn_referee_fee * 100
            : 0))) /
      100
    );
  };

  const handleFileInput = (e: any) => {
    const file = e.target.files[0];
    if (
      file &&
      ["image/jpeg", "image/png", "image/gif", "image/jpg"].includes(file.type)
    ) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file: any) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: "tournaments/" + file.name,
      ContentType: "image/jpeg",
    };

    myBucket.putObject(params).send((err, data) => {
      var s3url = myBucket.getSignedUrl("getObject", { Key: params.Key });
      const str = s3url.split("?")[0];
      setLogoUrl(str);
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((data) => {
        data.logo = logoUrl;
        handleFormUpdate(data);
      })
      .catch((error) => {
        console.log("Validate Failed:", error);
      });
  };
  return (
    <Modal
      title="Become our sponsor"
      visible={isBecome}
      onCancel={() => setIsBecome(false)}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ disabled: is_full }}
      okText={`Sponsor with ${currentMinAmount} ${currency.symbol}`}
      onOk={() => {
        form
          .validateFields()
          .then((data) => {
            data.logo = logoUrl;
            handleFormUpdate(data);
            //setIsBecome(false);
          })
          .catch((error) => {
            console.log("Validate Failed:", error);
          });
      }}
      footer={null}
      className={s.becomeSponsor}
    >
      <Form
        form={form}
        initialValues={{
          amount: "",
          name: "",
          home_page: "",
          ads_video: "",
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
              className={s.selectTier}
              defaultValue={tierUid}
              onChange={handleTierChange}
              status={is_full ? "error" : ""}
            >
              {tiersSelect.map((tier) => (
                <Option key={tier.uid} value={tier.uid} disabled={tier.is_full}>
                  {tier.name}
                </Option>
              ))}
            </Select>
            {is_full && (
              <div style={{ color: "#ff4d4f" }}>
                All slots of this tier have been occupied.
              </div>
            )}
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
                  message: "Sponsor amount is required.",
                },
                {
                  type: "number",
                  min: minAmount,
                  message: `Sponsor amount must be greater than ${minAmount} ${currency.symbol}.`,
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                ref={inputSponsorAmountRef}
                min={0}
                max={999999999999999}
                placeholder={`Min ${minAmount} ${currency.symbol}`}
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
                {/* <CircleImage src={logoUrl || "/assets/avatar.jpg"} /> */}
                <img src={logoUrl || "/assets/avatar.jpg"} alt="" />
              </Col>
              <Col span={18} className="pl-2">
                <input
                  style={{ display: "none" }}
                  type="file"
                  ref={inputFileRef}
                  onChange={handleFileInput}
                  accept="image/png, image/jpeg, image/gif"
                  disabled={is_full}
                />
                <Button
                  onClick={() => inputFileRef.current?.click()}
                  className="mb-2"
                  disabled={is_full}
                >
                  Upload logo
                </Button>
                <Text
                  style={{ color: "#ffffff", fontSize: 12, display: "block" }}
                >
                  Recommended: transparent logo (.png)
                </Text>
                <div className={s.message_error}>{messageError}</div>
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
              <Input placeholder="Sponsor name" disabled={is_full} />
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
                // {
                //   required: true,
                //   message: "Home page is required.",
                // },
                {
                  type: "url",
                  message: "Not a valid url",
                },
              ]}
            >
              <Input placeholder="https://..." disabled={is_full} />
            </Form.Item>
          </Col>
        </Row>
        <Row align="middle" className="mb-4">
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
        <Row align="middle" className="mb-4">
          <Col xs={{ span: 6 }} md={{ span: 8 }}>
            <label>Lucis fee</label>
          </Col>
          <Col xs={{ span: 4 }} md={{ span: 4 }}>
            <span style={{ color: "white", marginTop: "10px" }}>
              {getConfigFee ? getConfigFee[0]?.tn_lucis_fee * 100 : 0}%
            </span>
          </Col>
          <Col xs={{ span: 8 }} md={{ span: 8 }}>
            <label>Referees fee</label>
          </Col>
          <Col xs={{ span: 6 }} md={{ span: 4 }}>
            <span style={{ color: "white", marginTop: "10px" }}>
              {getConfigFee ? getConfigFee[0]?.tn_referee_fee * 100 : 0}%
            </span>
          </Col>
        </Row>
        <Row align="middle">
          <Col xs={{ span: 10 }} md={{ span: 8 }}>
            <label>Total payment</label>
          </Col>
          <Col xs={{ span: 14 }} md={{ span: 16 }}>
            <span style={{ color: "white", marginTop: "10px" }}>
              {format(totalPayment, 2, {zero_trim: true})} {currency.symbol}
            </span>
          </Col>
        </Row>
        <div className={s.btnContainter}>
          <Button
            onClick={handleOk}
            className={s.btnConfirm}
            loading={isLoading}
          >
            Sponsor with {format(currentMinAmount, 2, {zero_trim: true})} {currency.symbol}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
