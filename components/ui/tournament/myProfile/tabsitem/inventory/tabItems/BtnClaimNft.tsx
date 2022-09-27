import React, {ReactElement, ReactNode} from "react";
import {observer} from "mobx-react-lite";
import {KButton} from "../../../../../common/button";
import ConnectWalletStore from "../../../../../../Auth/ConnectWalletStore";
import {useClaimNftBox} from "../InventoryService";
import {handleGraphqlErrors} from "../../../../../../../utils/apollo_client";
import {isDevMode} from "../../../../../../../utils/Env";

type Props = {
  prize_id?: string,
  setStatusPopupContact?: (visible: boolean) => void,
}
export default observer(function BtnClaimNft(props: Props) {
  const {prize_id, setStatusPopupContact} = props;

  const walletConnected = ConnectWalletStore.isConnected;
  const connectWallet = () => {
    ConnectWalletStore.showConnectWalletModal();
  };

  const {loading, claimNftBox} = useClaimNftBox({
    address: ConnectWalletStore.address ?? "",
    prize_id: parseInt(prize_id ?? "") ?? 0,
  });

  const handleClaimNftBox = () => {
    claimNftBox()
      .then((res: any) => {
        console.log('{useClaimNftBox} res: ', res);
        if (res.claimNftBox) {
          // success
          // TODO: Show popup congrate with styled modal
          // Reduce amount
        } else {
          // something wrong
          // TODO:
        }
      })
      .catch(e => {
        // console.log('{handleClaimGiftCard} e: ');
        // console.dir(e)

        handleGraphqlErrors(e, (code, message) => {
          if (isDevMode) {
            console.log('{useClaimNftBox} code, message: ', code, message);
          }

          switch (code) {
            case "UserHasClaimed":
              // do nothing because of UI error, this must never happen
              break;
            case "OutOfStock":
            // yes if out of stock mean  user can still receive prize, cuz we forgot to prepare the inventory
            case "ItemNotFound":
            default:
              // client or other error
              // IF error then user cannot claim automatically, so we handle it manually
              setStatusPopupContact && setStatusPopupContact(true);
              break;
          }
        })
      });
  }

  return (walletConnected
      ? <KButton
        title="Claim"
        width="80px"
        onClick={handleClaimNftBox}
        loading={loading}
      />
      : <KButton title="Connect" width="80px" onClick={connectWallet} />
  )
});
