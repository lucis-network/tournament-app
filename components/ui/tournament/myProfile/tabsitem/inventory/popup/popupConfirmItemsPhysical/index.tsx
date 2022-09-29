import React, {useState} from "react";
import {Button, Form, Input, message, Modal, Popconfirm} from "antd";
import s from "./index.module.sass";
import {InventoryItem} from "../../../../../../../../src/generated/graphql_p2e";
import sChestPrize from "../../../../../../p2e/lucky/prize/ChestPrize.module.sass";
import PrizePopover from "components/ui/p2e/lucky/prize/popover";
import {ApolloQueryResult, useMutation} from "@apollo/client";
import {CLAIM_PHYSICAL_ITEM} from "../../../../../../../../hooks/p2e/useP2E";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import AuthStore from "../../../../../../../Auth/AuthStore";
import {isEmpty} from "lodash";
import {isPhoneNumber} from "class-validator";

interface Props {
  status: boolean;
  onClosePopup: () => void;
  item: InventoryItem;
  refetchMyInventoryItems: () => Promise<ApolloQueryResult<any>>
}

export default function PopupConfirmItemsPhysical(props: Props) {
  const localUserInfo = AuthStore;
  const [phone, setPhone] = useState<string>(localUserInfo?.profile?.phone as string);
  const [phoneError, setPhoneError] = useState<string | undefined>(undefined)
  const {status, item, onClosePopup, refetchMyInventoryItems} = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [claimPhysicalItem] = useMutation(CLAIM_PHYSICAL_ITEM);
  const onCancel = () => {
    onClosePopup();
  }
  const onCancelPopupconfirm = () => {
    setVisible(false);
  };

  const showPopconfirm = async () => {
    let valid = await form
      .validateFields()
      .then( (values) => {
        return true;
      })
      .catch(errorInfo => {
        console.log('{default.errorInfo} errorInfo: ', errorInfo);

        // setPhoneError("Invalid phone number")

        return errorInfo.errorFields.length > 0;
      });

    if (valid) {
      // validate phone because phone does not use Antd Form
      if (isEmpty(phone) || !isPhoneNumber(phone)) {
        valid = false
        setPhoneError("Invalid phone number")
        console.log('{showPopconfirm} invalid phone: ', phone);
      }
    }

    if (valid) {
      setVisible(true);
    }
  };
  const handleOk = () => {
    setConfirmLoading(true);
    const shipping_address = form.getFieldValue("address");
    //const phone = form.getFieldValue("phone");
    const response = claimPhysicalItem({
      variables: {
        input: {
          prize_id: Number(item?.prize?.id),
          shipping_address: shipping_address,
          phone: {
            set: phone
          }
        }
      },
      context: {
        endpoint: 'p2e'
      }
    }).then((res) => {
      message.success("Success!");
      setConfirmLoading(false);
      onClosePopup();
      refetchMyInventoryItems();
    }).catch((err) => {
      message.error("Error!");
      setConfirmLoading(false);
      setVisible(false);
    })
  };

  return (
    <Modal
      centered
      title={<h3 className="text-20px text-white">{item?.prize?.title}</h3>}
      visible={status}
      wrapClassName={s.mdl}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>Cancel</Button>,

        // eslint-disable-next-line react/jsx-key
        <Popconfirm
          title={
          <>
            <div className={s.descPopConfirm}>
              <p>Make sure your information is correct.</p>
              <p>If this is incorrect, Lucis will not be responsible for any problems.</p>
            </div>
          </>
          }
          onConfirm={handleOk}
          onCancel={onCancelPopupconfirm}
          okText="Yes"
          visible={visible}
          cancelText="No"
          okButtonProps={{ loading: confirmLoading }}
          placement="topRight"
          className={s.mdlPopConfirm}
        >
          <Button key="confirm" type="primary"  onClick={showPopconfirm}>
            Confirm
          </Button>
        </Popconfirm>
      ]}
    >
      <div className={s.wrapper}>
        <PrizePopover
          image={item?.prize?.img ?? ""}
          title={item?.prize?.title ?? ""}
          description={item?.prize?.desc ?? ""}
          rarity={item?.prize?.rarity ?? ""}
        >
          <div className={`${sChestPrize.chestPrize} ${item?.prize?.rarity ?? ''} ${s.chestPrize}`}>
            <div className={sChestPrize.prizeImg}>
              <img src={item?.prize?.img ?? '/assets/P2E/lucky-chest/defaultPrizeImage.png'} alt=""/>
            </div>
          </div>
        </PrizePopover>
        <div className={s.desc}>
          <p>Please leave your address and phone number here.</p>
          <p>We will send your prize in the shortest time possible.</p>
          <p>Please watch out your phone during this time.</p>
        </div>

        <div className={s.form}>
          <Form form={form} autoComplete="off">
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!"
                }
              ]}>
              <Input placeholder="Your address" className={s.formFieldBg} autoComplete="false" />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
            >
              <PhoneInput
                country={`${localUserInfo?.profile?.country_code?.toLowerCase()}`}
                enableSearch
                value={phone}
                onChange={(phone) => {
                  setPhoneError(undefined)
                  phone = !phone.includes('+') ? '+' + phone : phone
                  setPhone(phone)
                }}
                placeholder="Enter phone number"
                buttonClass={`${s.inputPhone}`}
              />
              <span style={{color: 'red', marginTop: '16px'}}>{phoneError}</span>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
