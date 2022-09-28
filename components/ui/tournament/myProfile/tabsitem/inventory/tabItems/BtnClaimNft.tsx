import React, {ReactElement, ReactNode} from "react";
import {observer} from "mobx-react-lite";
import {KButton} from "../../../../../common/button";
import ConnectWalletStore from "../../../../../../Auth/ConnectWalletStore";
import {useClaimNftBox} from "../InventoryService";
import {handleGraphqlErrors} from "../../../../../../../utils/apollo_client";
import {isDevMode} from "../../../../../../../utils/Env";
import {BSC_MainNet, BSC_TestNet} from "../../../../../../../utils/blockchain/ChainConfig";


type Props = {
  prize_id?: string,
  onClaimSuccess: (tx_hash: string, explorer_url: string) => void,
  onClaimError: (e: Error) => void,
}
export default observer(function BtnClaimNft(props: Props) {
  const {prize_id, onClaimSuccess, onClaimError} = props;

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
    // (new Promise((r, rj) => r({
    //   claimNftBox: {tx_hash: "0x617fffa0dc0b45a559ea52f584decc78cb794375d57e36747fbc22b08342b6f9"}
    // })))
      .then((res: any) => {
        console.log('{useClaimNftBox} res: ', res);
        const tx_hash = res.claimNftBox.tx_hash ?? '';
        if (tx_hash) {
          // success
          const chain_id = parseInt("" + process.env.NEXT_PUBLIC_CHAIN_ID__BSC);
          const is_mainnet = chain_id === BSC_MainNet.chain_id;
          const explorer_url = (is_mainnet ? BSC_MainNet.blockExplorerUrls![0] : BSC_TestNet.blockExplorerUrls![0]) + `/tx/${tx_hash}`;

          onClaimSuccess(tx_hash, explorer_url)
        } else {
          // something wrong
          const e = new Error("Unknown");
          // @ts-ignore
          e.code = "Unknown";

          onClaimError(e)
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
              onClaimError(e)
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
