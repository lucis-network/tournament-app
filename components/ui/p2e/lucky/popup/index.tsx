import {message, Modal} from "antd";
import React, { useState } from "react";
import { useWindowSize } from "../../../../../hooks/useWindowSize";
import s from "./PopupBox.module.sass";
import SliderBox from "../slider";
import PopupRollingChest from "./popupRollingChest";
import ButtonOpenBox from "../button/buttonOpen";
import PopupRewardChest from "./popupRewardChest";
import {ChestDetail, LuckyChestPrize, LuckyChestTier, LuckyChestType, OpenChestResponse} from "../../../../../src/generated/graphql_p2e";
import {OPEN_CHEST, useGetLuckyChestUserInfo} from "../../../../../hooks/p2e/luckyChest/useLuckyChest";
import {ApolloQueryResult, useMutation} from "@apollo/client";
import {handleGraphqlErrors} from "../../../../../utils/apollo_client";
import {b64DecodeUnicode} from "../../../../../utils/String";

type Props = {
  status: boolean;
  closePopupOpenBox: () => void;
  chestDetail: ChestDetail;
};
export default function PopUpOpenBox(props: Props) {
  const { status, closePopupOpenBox, chestDetail } = props;
  const [rollingChestPopupVisible, setRollingChestPopupVisible] = useState(false);
  const [chestResponse, setChestResponse] = useState<OpenChestResponse>({} as OpenChestResponse);
  const [width] = useWindowSize();

  const {dataLuckyChestUserInfo} = useGetLuckyChestUserInfo({
    type: LuckyChestType.Csgo,
    tier: LuckyChestTier.Standard,
  })

  const [openLuckyChest] = useMutation(OPEN_CHEST, {
    context: {
      endpoint: 'p2e'
    }
  })

  const openRollingLuckyChest = async () => {
    try {
      await openLuckyChest({
        variables: {
          type: LuckyChestType.Csgo,
          tier: LuckyChestTier.Standard,
        },
        onCompleted: (data) => {
          const decodedData = JSON.parse(b64DecodeUnicode(data?.openChest?.prize))
          const newOpenChestResponse = {
            prize: decodedData
          }

          setChestResponse(newOpenChestResponse);
          setRollingChestPopupVisible(true);
        }
      })
    } catch (error: any) {
      handleGraphqlErrors(error, (code) => {
        console.log(code);
        switch (code) {
          case "NotEnoughLucisPoint":
            message.error("You not enough lucis point!");
            return;
          default:
            message.error("Something was wrong! Please contact to Lucis network!");
            return;
        }
      })
    }
  }

  return (
    <div className={s.wrapper}>
      <Modal
        className={s.modal}
        width={"100%"}
        visible={status}
        onOk={closePopupOpenBox}
        onCancel={closePopupOpenBox}
      >
        <div className={s.container}>
          <div className={s.wrapper}>
            <div className={s.content_box}>
              <h3 className={s.content_box_heading}>OPEN BOX !</h3>
              <p className={s.content_box_des}>Open the box to receive many attractive gifts</p>
              <div className={s.content_box_img}>
                <img src="/assets/P2E/lucky-chest/im_box.png" alt=""/>
              </div>
              <div className={s.content_right}>
                <div className={s.line}>
                  {width >= 1024 ? (
                    <img src="/assets/P2E/lucky-chest/ic_line.svg" alt=""/>
                  ) : (
                    <img src="/assets/P2E/lucky-chest/ic_line_top.png" alt=""/>
                  )}
                </div>
                <div className={s.block_item}>
                  {dataLuckyChestUserInfo && dataLuckyChestUserInfo?.history?.map((item, index) => {
                    return (
                      <div className={s.item} key={'k' + index + item?.prize.id}>
                        <img src={item?.prize?.img ? item?.prize?.img : "/assets/P2E/lucky-chest/im_box.png"} alt=""/>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className={s.im_box}>
                <div className={s.btn_open}>
                  <div onClick={openRollingLuckyChest}>
                    <ButtonOpenBox>Open</ButtonOpenBox>
                  </div>
                  <div className={s.number_coin}>
                    <p>{chestDetail?.ticket_cost}</p>
                    <img
                      src="/assets/P2E/lucky-chest/ic_lucis_coin.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

          <div className={s.reward_box}>
            <h3>Items that might be in this Box:</h3>
            <SliderBox chestDetail={chestDetail}/>
          </div>
        </div>
          <div>
            {rollingChestPopupVisible && <PopupRollingChest
                visible={rollingChestPopupVisible}
                closePopupRollingChest={() => setRollingChestPopupVisible(false)}
                chestDetail={chestDetail}
                chestResponse={chestResponse}
            />}
          </div>
        </div>
      </Modal>
    </div>
  );
}
