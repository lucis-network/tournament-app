import s from "./ChestPrize.module.sass"
import {Popover} from "antd";
import {Maybe} from "@graphql-tools/utils";
import PrizePopover from "./popover";

export type ChestPrizeProps = {
  image: string,
  title: string,
  description: Maybe<string> | undefined,
  rarity: string,
}

const ChestPrize = ({image, title, description, rarity}: ChestPrizeProps) => {
  console.log('[ChestPrize] rarity: ', rarity);
  return (
    <PrizePopover
      image={image}
      title={title}
      description={description}
      rarity={rarity}
    >
      <div className={`${s.chestPrize} ${rarity ?? ''}`}>
        <div className={s.prizeImg}>
          <img src={image ?? '/assets/P2E/lucky-chest/defaultPrizeImage.png'} alt="" />
        </div>
        <div className={s.prizeTitle}>
          {title ?? ''}
        </div>
      </div>
    </PrizePopover>
  )
}

export default ChestPrize