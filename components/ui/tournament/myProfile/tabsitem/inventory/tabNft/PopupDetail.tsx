import {Form, Input, message, Modal, Image, Spin, Button, Row, Col, Tooltip} from "antd";

import Link from "next/link";
import React, {useMemo} from "react";
import s from "./nftTab.module.sass";
import {trim_middle} from "../../../../../../../utils/String";
import {isClient, isClientDevMode} from "../../../../../../../utils/Env";

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

  const explorer = isClientDevMode ? process.env.NEXT_PUBLIC_BSC_EXPLORER_TESTNET : process.env.NEXT_PUBLIC_BSC_EXPLORER_MAINNET ?? "https://testnet.bscscan.com";
  const imageLink = useMemo(() => {
    return metadata?.image?.replace(".webp", "_md.webp");
  }, [metadata?.image])


  return (
    <>
      <Modal
        visible={true}
        onCancel={() => onCancel()}
        wrapClassName="connect-lmss-modal"
        footer={[]}
        centered
        width={1000}
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
                <div className={s.item} title={ownerAddress}>
                  <span>Owned by </span>
                  <span className={`${s.content} ${s.link}`}>
                    <a target="_blank" rel="noopener noreferrer" href={`${explorer}/address/${ownerAddress}`}>
                      {trim_middle(ownerAddress, 8, 6)}
                    </a>
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
                    </span>
                </div>
                <div className={s.item}>
                  <span>Contract address </span>
                  <span className={`${s.content} ${s.link}`}>
                    <a target="_blank" rel="noopener noreferrer" href={`${explorer}/address/${contractAddress}`}>
                      {trim_middle(contractAddress, 8, 6)}
                    </a>
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
                    </span>
                </div>
                <div className={s.item}>
                  <span>Token ID </span>
                  <span className={s.content}>#{tokenId}</span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
}