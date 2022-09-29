import {Form, Input, message, Modal, Image, Spin, Button, Row, Col, Tooltip} from "antd";

import Link from "next/link";
import React, {useMemo} from "react";
import s from "./nftTab.module.sass";
import {trim_middle} from "../../../../../../../utils/String";

interface IProps {
  metadata: any;
  tokenId: number;
  onCancel: () => void;
  ownerAddress: string;
  contractAddress: string;
}

export const NftDetail = ({metadata, tokenId, onCancel, ownerAddress, contractAddress}: IProps) => {
  const [isCopyOwnerAddress, setIsCopyOwnerAddress] = React.useState(false);
  const [isCopyContractAddress, setIsCopyContractAddress] = React.useState(false);

  const imageLink = useMemo(() => {
    return metadata?.image?.replace(".webp", "_md.webp");
  }, [metadata?.image])


  return (
    <>
      <Modal
        title={"Nft #" + tokenId}
        visible={true}
        onCancel={() => onCancel()}
        wrapClassName="connect-lmss-modal"
        footer={[]}
        width={1200}
        maskClosable={false}
      >
        <div className={s.nftDetail}>
          <Row gutter={16}>
            <Col md={12} lg={12} xs={24}>
              <img
                src={imageLink}
                alt={"nft" + tokenId}
              />
            </Col>
            <Col md={12} lg={12} xs={24}>
              <div>
                <div className={s.name}>
                  {metadata.name}
                </div>
                <div className={s.des}>
                  {metadata.description}
                </div>
                <div className={s.ownerBy} title={ownerAddress}>
                  <span>Owned by: </span>
                  {trim_middle(ownerAddress, 8, 6)}
                  <img width="20"
                       onClick={() => {
                         setIsCopyOwnerAddress(true);
                         navigator.clipboard.writeText(ownerAddress);
                         setTimeout(() => {
                           setIsCopyOwnerAddress(false);
                         }, 3000);
                       }}
                       style={{cursor: "pointer", marginLeft: 4}}
                       src={isCopyOwnerAddress ? "/assets/P2E/overview/copied.svg" : "/assets/P2E/overview/copy-icon.svg"}/>
                </div>
                <div className={s.contractAddress}>
                  <span>Contract address: </span>
                  {contractAddress}
                  <img width="20"
                       onClick={() => {
                         setIsCopyContractAddress(true);
                         navigator.clipboard.writeText(ownerAddress);
                         setTimeout(() => {
                           setIsCopyContractAddress(false);
                         }, 3000);
                       }}
                       style={{cursor: "pointer", marginLeft: 4}}
                       src={isCopyContractAddress ? "/assets/P2E/overview/copied.svg" : "/assets/P2E/overview/copy-icon.svg"}/>
                </div>
                <div className={s.tokenId}>
                  <span>Token ID: </span>
                  #{tokenId}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
}