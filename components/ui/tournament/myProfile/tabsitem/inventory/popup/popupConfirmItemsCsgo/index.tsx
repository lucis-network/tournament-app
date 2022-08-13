import React, {useState} from "react";
import {Button, Form, Input, message, Modal, Popconfirm} from "antd";
import s from "./index.module.sass";
import {InventoryItem} from "../../../../../../../../src/generated/graphql_p2e";
import sChestPrize from "../../../../../../p2e/lucky/prize/ChestPrize.module.sass";
import PrizePopover from "components/ui/p2e/lucky/prize/popover";
import {ApolloQueryResult, useMutation} from "@apollo/client";
import {CLAIM_CSGO_ITEM} from "../../../../../../../../hooks/p2e/useP2E";

interface Props {
  status: boolean;
  onClosePopup: () => void;
  item: InventoryItem;
  refetchMyInventoryItems: () => Promise<ApolloQueryResult<any>>
}

export default function PopupConfirmItemsCsgo(props: Props) {
  const {status, onClosePopup, item, refetchMyInventoryItems} = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [claimCSGOItem] = useMutation(CLAIM_CSGO_ITEM);
  const onCancel = () => {
    onClosePopup();
  }
  const onCancelPopupconfirm = () => {
    setVisible(false);
  };

  const showPopconfirm = () => {
    form
      .validateFields()
      .then( () =>
        setVisible(true)
      );
  };
  const handleOk = () => {
    setConfirmLoading(true);
    const steam_url = form.getFieldValue("steamUrl");

    const response = claimCSGOItem({
      variables: {
        input: {
          prize_id: Number(item?.prize?.id),
          steam_url: steam_url,
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
      footer={[
        <Button key="cancel" onClick={onCancel}>Cancel</Button>,

        // eslint-disable-next-line react/jsx-key
        <Popconfirm
          title={
          <>
            <div className={s.descPopConfirm}>
              <p>Make sure this is your Steam URL.</p>
              <p>If this URL is incorrect, Lucis will not be responsible for any problems.</p>
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
          <p>Please leave your steam URL here.</p>
          <p> Lucis will send you a trade offer immediately.</p>
          <p> Confirm this trade offer within 1 day.</p>
          <p> We will send your prize in the shortest time possible.</p>
        </div>

        <div className={s.form}>
          <Form form={form} autoComplete="off">
            <Form.Item
              name="steamUrl"
              rules={[
                {
                  required: true,
                  message: "Please input your steam url!"
                },
                {
                  type: "url",
                  message: "This field must be a valid url!"
                }
              ]}>
              <Input placeholder="Your steam url" className={s.formFieldBg} autoComplete="false" />
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
