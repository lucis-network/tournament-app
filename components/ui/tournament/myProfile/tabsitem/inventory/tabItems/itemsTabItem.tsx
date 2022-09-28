import React, {ReactElement, ReactNode, useCallback, useState} from "react";
import s from "../index.module.sass";
import {InventoryItem, ItemGroup} from "src/generated/graphql_p2e";
import PrizePopover from "../../../../../p2e/lucky/prize/popover";
import sChestPrize from "../../../../../p2e/lucky/prize/ChestPrize.module.sass";
import {ApolloQueryResult} from "@apollo/client";
import PopupConfirmItemsCsgo from "../popup/popupConfirmItemsCsgo";
import PopupConfirmItemsPhysical from "../popup/popupConfirmItemsPhysical";
import PopupContactRaffles from "components/ui/p2e/raffles/popup/popupContact";
import {KButton} from "components/ui/common/button";
import {useClaimGiftCard} from "../InventoryService";
import {handleGraphqlErrors} from "../../../../../../../utils/apollo_client";
import {isDevMode} from "../../../../../../../utils/Env";
import CopyText from "./CopyText";
import BtnClaimNft from "./BtnClaimNft";
import StyledModal from "../../../../../common/StyledModal";
import ButtonWrapper from "../../../../../../common/button/Button";
import {AppEmitter} from "../../../../../../../services/emitter";
import Link from "next/link";

type Props = {
  item: InventoryItem;
  isOwner?: boolean;
  refetchMyInventoryItems: () => Promise<ApolloQueryResult<any>>;
};

const ItemsTabItem = (props: Props) => {
  const { item, isOwner, refetchMyInventoryItems } = props;
  const [statusCsgo, setStatusCsgo] = useState<boolean>(false);
  const [statusPhysical, setStatusPhysical] = useState<boolean>(false);
  const [statusPopupContact, setStatusPopupContact] = useState<boolean>(false);
  const [codeVisible, setCodeVisible] = useState<boolean>(false);
  const [stState, setStState] = useState<{
    visible: boolean,
    content?: ReactNode,
  }>({
    visible: false,
    content: null,
  });

  // const openCodePopup = useCallback(() => setCodeVisible(true), [setCodeVisible]);
  const revealCode = useCallback(() => setCodeVisible(true), [setCodeVisible]);

  const {loading: loadingClaimGiftCard, claimGiftCard} = useClaimGiftCard(
    {user_inventory_item_uid: item.uid ?? ""},
  );

  const is_claimed = item.is_claimed === true; // is_claimed is null / false / true
  const is_gift_card = item.prize?.category?.in_game_prize_type == "GiftCard";


  const handleClaimGiftCard = () => {
    claimGiftCard()
      .then(res => {
        console.log('{handleClaimGiftCard} res: ', res);
      })
      .catch(e => {
        // console.log('{handleClaimGiftCard} e: ');
        // console.dir(e)

        handleGraphqlErrors(e, (code, message) => {
          if (isDevMode) {
            console.log('{handleGraphqlErrors} code, message: ', code, message);
          }

          switch (code) {
            case "UserHasClaimed":
              // do nothing because of UI error, this must never happen
              break;
            case "OutOfStock":
              // yes if out of stock mean  user can still receive prize, cuz we forgot to prepare the inventory
            case "NotGiftCard":
            case "ItemNotFound":
            default:
              // client or other error
              // IF error then user cannot claim automatically, so we handle it manually
              setStatusPopupContact(true);
              break;
          }
        })
      });
  }

  const handleClaimAction = () => {
    if (item?.prize?.category?.item_group === ItemGroup.Csgo) {
      setStatusCsgo(true);
    } else if (item?.prize?.category?.item_group === ItemGroup.Physical) {
      setStatusPhysical(true);
    }
    // else if (item?.prize?.category?.item_group === ItemGroup.Nft) {
    //   handleClaimNftBox();
    // }
    else {
      setStatusPopupContact(true);
    }
  };


  const onClaimSuccess = useCallback((tx_hash: string, explorer_url: string) => {
    setStState && setStState({
      visible: true,
      content: <div>
        <p style={{"wordBreak": "break-word"}}>
          Successfully claim 1 Lucis NFT BOX into your wallet
          with transaction <a href={explorer_url} target="_blank" rel="noreferrer">{tx_hash}</a>
          <br/>
          <p>
            Please check the
            <Link href={'/profile?page=inventory&type=nfts'} passHref>&nbsp;NFT tabs</Link>
            &nbsp;or import the token into your favorite wallet
          </p>
        </p>
      </div>,
    })
    // Reduce amount
    refetchMyInventoryItems()

    // Refetch NFT tabs
    AppEmitter.emit("refetchMyInventoryNft");
  }, [setStState]);

  const onClaimError = useCallback((e: Error) => {
    setStatusPopupContact && setStatusPopupContact(true);
  }, [setStatusPopupContact]);


  const getCta = (): ReactNode => {
    if (is_claimed) {
      if (is_gift_card) {
        return codeVisible
          ? <CopyText text={item.gift_card?.code ?? ""} />
          : <KButton
            title="Show Code"
            width="80px"
            onClick={revealCode}
          />
      }
    }

    if (is_gift_card) {
      return <KButton
        title="Claim"
        width="80px"
        loading={loadingClaimGiftCard}
        disabled={(item.quantity ?? 0) <= 0}
        onClick={handleClaimGiftCard}
      />
    }

    const is_nft_box = item.prize?.category?.item_group == ItemGroup.Nft;
    if (is_nft_box) {
      return <BtnClaimNft
        prize_id={item.prize?.id}
        onClaimSuccess={onClaimSuccess}
        onClaimError={onClaimError}
      />
    }

    return <KButton
      title="Claim"
      width="80px"
      disabled={(item.quantity ?? 0) <= 0}
      onClick={handleClaimAction}
    />
  }

  return (
    <>
      <PrizePopover
        image={item?.prize?.img ?? ""}
        title={item?.prize?.title ?? ""}
        description={item?.prize?.desc ?? ""}
        rarity={item?.prize?.rarity ?? ""}
      >
        <div
          className={`${sChestPrize.chestPrize} ${item?.prize?.rarity ?? ""} ${s.chestPrize}`}
        >
          <div className={sChestPrize.prizeImg}>
            <img
              src={
                item?.prize?.img ??
                "/assets/P2E/lucky-chest/defaultPrizeImage.png"
              }
              alt=""
            />
          </div>
          <div className={`${sChestPrize.prizeTitle} ${s.prizeTitle}`}>
            {item?.prize?.title ?? ""}
          </div>
          {item?.quantity && isOwner && (
            <div className={s.prizeAmount}>
              {/* only show claim if not GiftCard */}
              {!is_gift_card && <div className={s.prizeAmountQty}>Amount: {item?.quantity}</div>}
              <div>
                {getCta()}
              </div>
            </div>
          )}
        </div>
      </PrizePopover>
      {statusCsgo && (
        <PopupConfirmItemsCsgo
          item={item}
          status={statusCsgo}
          refetchMyInventoryItems={refetchMyInventoryItems}
          onClosePopup={() => setStatusCsgo(false)}
        ></PopupConfirmItemsCsgo>
      )}
      {statusPhysical && (
        <PopupConfirmItemsPhysical
          item={item}
          status={statusPhysical}
          refetchMyInventoryItems={refetchMyInventoryItems}
          onClosePopup={() => setStatusPhysical(false)}
        ></PopupConfirmItemsPhysical>
      )}
      {statusPopupContact && (
        <PopupContactRaffles
          status={statusPopupContact}
          closePopupContact={() => setStatusPopupContact(false)}
          contactURL="https://discord.gg/7SdtYpGENT"
          description="Congratulations on your lucky win from Lucis. It is not sent to you right away, please contact Lucis Support for instructions on receiving the prize."
        />
      )}

      <StyledModal
        visible={stState.visible}
        onCancel={() => setStState({visible: false})}
        onOk={() => setStState({visible: false})}
        cancelText={"Close"}
        maskClosable={false}
      >
        {stState.content ?? null}
      </StyledModal>
    </>
  );
};

export default ItemsTabItem;
