import s from "./ChestPrize.module.sass";
import {Popover} from "antd";
import {ChestPrizeProps} from "./index";
import {Maybe} from "@graphql-tools/utils";

type PrizePopoverProps = {
  image: string,
  title: string,
  description: Maybe<string> | undefined,
  rarity: string,
  children?: JSX.Element
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
        <h3 className={s.detailPrizeRarity}>Rarity: {rarity ?? ''}</h3>
        {description && (
          <p className={s.detailPrizeDesc}>{description}</p>
        )}
      </div>
    </div>
  )
}

const PrizePopover = ({image, title, description, rarity, children}: PrizePopoverProps) => {
  return (
    <Popover
      content={<PrizeDetail description={description} image={image} rarity={rarity} title={title} />}
      title={title}
      overlayClassName={`${s.prizeDetail} ${rarity}`}
      placement="top"
    >
      {children}
    </Popover>
  )
}
export default PrizePopover