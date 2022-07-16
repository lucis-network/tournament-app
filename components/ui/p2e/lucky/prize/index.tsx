import s from "./ChestPrize.module.sass"
import {Popover} from "antd";
import {Maybe} from "@graphql-tools/utils";

type ChestPrizeProps = {
  image: string,
  title: string,
  description: Maybe<string> | undefined,
  rarity: string,
}

const PrizeDetail = ({image, title, description, rarity}: ChestPrizeProps) => {
  return (
    <div className={`${s.prizeDetailContent} ${rarity ?? ''}`}>
      <div className={s.detailPrizeCard}>
        <div className={s.detailPrizeImage}>
          <img src={image ?? '/assets/P2E/lucky-chest/defaultPrizeImage.png'} alt="" onError={(e) => {
            e.currentTarget.src = '/assets/P2E/lucky-chest/defaultPrizeImage.png'
          }} />
        </div>
        <div className={s.detailPrizeTitle}>{title ?? ''}</div>
      </div>
      <div className={s.detailPrizeInfo}>
        <h3 className={s.detailPrizeRarity}>Quality: {rarity ?? ''}</h3>
        {description && (
          <p className={s.detailPrizeDesc}>{description}</p>
        )}
      </div>
    </div>
  )
}

const ChestPrize = ({image, title, description, rarity}: ChestPrizeProps) => {
  console.log('[ChestPrize] rarity: ', rarity);
  return (
    <Popover
      content={<PrizeDetail description={description} image={image} rarity={rarity} title={title} />}
      title={title}
      overlayClassName={`${s.prizeDetail} ${rarity}`}
      placement="top"
      arrowPointAtCenter
      // defaultVisible={true}
      // visible={true}
    >
      <div className={`${s.chestPrize} ${rarity ?? ''}`}>
        <div className={s.prizeImg}>
          <img src={image ?? '/assets/P2E/lucky-chest/defaultPrizeImage.png'} alt="" />
        </div>
        <div className={s.prizeTitle}>
          {title ?? ''}
        </div>
      </div>
    </Popover>
  )
}

export default ChestPrize