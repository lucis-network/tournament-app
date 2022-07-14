import s from "./ChestPrize.module.sass"
import {Popover} from "antd";
import {Maybe} from "@graphql-tools/utils";

type ChestPrizeProps = {
  image: string,
  title: string,
  description: Maybe<string> | undefined,
  rarity: string,
}

type PrizeDetailProps = {
  description: Maybe<string> | undefined,
}

const PrizeDetail = ({description}: PrizeDetailProps) => {
  return (
    <div className={s.prizeDetail}>
      {description}
    </div>
  )
}

const ChestPrize = ({image, title, description, rarity}: ChestPrizeProps) => {
  return (
    <Popover content={<PrizeDetail description={description} />} title="Title">
      <div className={`${s.chestPrize} ${rarity ?? ''}`}>
        <div className={s.prizeImg}>
          <img src={image ?? ''} alt="" />
        </div>
        <div className={s.prizeTitle}>
          {title ?? ''}
        </div>
      </div>
    </Popover>
  )
}

export default ChestPrize