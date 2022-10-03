import React, {useEffect, useMemo, useState} from "react";
import s from "../index.module.sass";
import sNftTab from "./nftTab.module.sass";
import sChestPrize from "../../../../../p2e/lucky/prize/ChestPrize.module.sass";
import {useMutation} from "@apollo/client";
import {MINT_NFT} from "../../../../../../../hooks/useNft";
import {NftDetail} from "./PopupDetail";
import {isClient} from "../../../../../../../utils/Env";

type Props = {
  tokenId?: number;
  isOwner?: boolean;
  contractAddress: string;
  ownerAddress: string;
  openDetail?: boolean;
};

const s3Metadata = isClient ? process.env.NEXT_PUBLIC_BSC_NFT_URI_TESTNET : process.env.NEXT_PUBLIC_BSC_NFT_URI_MAINNET;
const NftItem = (props: Props) => {
  const [isMetadataError, setIsMetadataError] = useState(false);
  const [metadata, setMetadata] = useState<any>({});
  const [openDetail, setOpenDetail] = useState(props.openDetail ?? false);
  const [loadedImage, setLoadedImage] = React.useState(false);
  const [mintNFT] = useMutation(MINT_NFT, {
    context: {
      endpoint: "p2e"
    }
  })

  useEffect(() => {
    fetch(`${s3Metadata}/${props.tokenId}.json`)
      .then((res) => res.json())
      .then(data => setMetadata(data))
      .catch((e) => setIsMetadataError(true))
  }, []);

  useEffect(() => {
    if (isMetadataError) {
      mintNFT({
        variables: {
          tokenId: parseFloat(props?.tokenId?.toString()!)
        }
      }).then(res => {
        setMetadata(JSON.parse(res.data.mintNft?.metadata))
      })
    }
  }, [isMetadataError])

  const imageLink = useMemo(() => {
    return metadata?.image?.replace(".webp", "_md.webp");
  }, [metadata?.image])
  return (
    <>
      {openDetail && <NftDetail contractAddress={props.contractAddress} ownerAddress={props.ownerAddress} metadata={metadata} onCancel={() => setOpenDetail(false)} tokenId={props.tokenId!}/>}
      <div className={sNftTab.nftItem} onClick={() => setOpenDetail(true)}>
        <div className={`${sChestPrize.chestPrize} ${s.chestPrize}`}>
          <div className={sChestPrize.prizeImg}>
            <img
              style={loadedImage ? {} : {display: "none"}}
              src={imageLink}
              alt="lucis box"
              onLoad={() => setLoadedImage(true)}
            />
            {!loadedImage && <img
                src={"/assets/la-bai.jpg"}
                alt="lucis box"
                style={{width: "100%", height: "auto"}}
            />}
          </div>
          <div className={`${sChestPrize.prizeTitle} ${s.prizeTitle}`}>
            {metadata.name}
          </div>

        </div>
      </div>
    </>
  );
};

export default NftItem;
