import {Form, Input, message, Modal, Image, Spin, Button, Row, Col, Tooltip, Tag} from "antd";

import Link from "next/link";
import React, {useMemo} from "react";
import s from "./nftTab.module.sass";
import {trim_middle} from "../../../../../../../utils/String";
import {isClient, isClientDevMode} from "../../../../../../../utils/Env";
import {BSC_MainNet, BSC_TestNet} from "../../../../../../../utils/blockchain/ChainConfig";

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

  const chain_id = parseInt("" + process.env.NEXT_PUBLIC_CHAIN_ID__BSC);
  const is_mainnet = chain_id === BSC_MainNet.chain_id;
  const explorer_url = (is_mainnet ? BSC_MainNet.blockExplorerUrls![0] : BSC_TestNet.blockExplorerUrls![0]);
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
            <Col sm={12} lg={12} xs={24}>
              <img
                className={s.nftImg}
                src={imageLink}
                alt={"nft" + tokenId}
              />
            </Col>
            <Col sm={12} lg={12} xs={24}>
              <div>
                <div className={s.name}>
                  {metadata.name}
                </div>
                <div className={s.tag}>
                  <Tag>{metadata.attributes[2].value}</Tag>
                  <Tag>{metadata.attributes[3].value}</Tag>
                </div>
                <div className={s.des}>
                  {metadata.description}
                </div>
                <div className={s.item} title={ownerAddress}>
                  <span>Owned by </span>
                  <span className={`${s.content} ${s.link}`}>
                    <a target="_blank" rel="noopener noreferrer" href={`${explorer_url}/address/${ownerAddress}`}>
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
                    <a target="_blank" rel="noopener noreferrer" href={`${explorer_url}/address/${contractAddress}`}>
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