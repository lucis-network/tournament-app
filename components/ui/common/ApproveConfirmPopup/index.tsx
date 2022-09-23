import React from "react";
import classes from "./index.module.sass";
import ConnectWalletStore, {
  nonReactive as ConnectWalletStore_NonReactiveData,
} from "components/Auth/ConnectWalletStore";
import {Button, Modal} from "antd";
import {P2EOnChainService} from "services/blockchain/P2EOnChainService";
import {LucisNFT, NFTManager} from "utils/Enum";

interface IProps {
  onClose: () => void;
  onOk: (state: boolean) => void;
}


const ApproveConfirmPopup: React.FC<IProps> = (props: IProps) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);

    if (!ConnectWalletStore_NonReactiveData.web3Provider) {
      console.log("You need connect your wallet to continue!");

    } else {
      const service = new P2EOnChainService(
        ConnectWalletStore_NonReactiveData.web3Provider,
        LucisNFT,
        NFTManager
      )
      const userAddress = ConnectWalletStore.address;
      if (userAddress) {
        const requestApproveNFTForAll = await service.requestApproveNFTForAll(NFTManager);

        setConfirmLoading(false)
        props.onOk(requestApproveNFTForAll);

      } else {
        console.log("co loi xay ra");
        setConfirmLoading(false)
      }
    }


  }
  return (
    <Modal
      className={classes.approvePopup}
      visible={true}
      title="Approve popup"
      onCancel={() => props.onClose()}
      confirmLoading={confirmLoading}
      footer={<Button
        type="primary"
        onClick={() => handleOk()}
        loading={confirmLoading}

      >APPROVE</Button>}
    >
      You need approve to continue
    </Modal>
  );
};

export default ApproveConfirmPopup;
