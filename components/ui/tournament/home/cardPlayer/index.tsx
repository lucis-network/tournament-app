import s from "./CardPlayer.module.sass"
import GradientLinkButton from 'components/ui/common/button/GradientButton'
import { Button } from "antd"

type Props = {}

export default function CardPlayer(props: Props) {
  return(
    <div className={s.content_card}>
      <div className={s.im_top_player}>
        <img src="/assets/home/im_top1.png" alt="" />
      </div>
      <div className={s.content_player}>
        <div className={s.avt}>
          <img src="" alt="" />
        </div>
        <p>Rosa Ji</p>
        <div className={s.btn}>
          <Button className={s.content_btn}>DONATE</Button>
        </div>
      </div>
    </div>
  )
}