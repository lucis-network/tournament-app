import s from "./ChestPrize.module.sass"
import {Maybe} from "@graphql-tools/utils";
import PrizePopover from "./popover";

export type ChestPrizeProps = {
  image: string,
  title: string,
  description: Maybe<string> | undefined,
  rarity: string,
  amount?: number,
}

const ChestPrize = ({image, title, description, rarity, amount}: ChestPrizeProps) => {
  return (
    <PrizePopover
      image={image}
      title={title}
      description={description}
      rarity={rarity}
    >
      <div className={`${s.chestPrize} ${rarity ?? ''}`}>
        <div className={`${s.prizeImg} ${amount == 0 ? s.disableImg : ``}`} >
          <img src={image ?? '/assets/P2E/lucky-chest/defaultPrizeImage.png'} className={amount == 0 ? s.disableImg : ``} alt="" />
        </div>
        <div className={s.prizeTitle}>
          {title ?? ''}
        </div>
        { amount &&
            <div className={`${s.prizeAmount} ${amount == 0 ? s.disableImg : ``}`}>
                Amount:{" "}{amount}
            </div>
        }

      </div>
    </PrizePopover>
  )
}

export default ChestPrize