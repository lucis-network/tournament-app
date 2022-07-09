import s from "./ButtonOpen.module.sass";
import {useWindowSize} from "../../../../../../hooks/useWindowSize";

type Props = {
  children: string
}
function ButtonOpenBox(props: Props) {
  const { children } = props;
  const [width] = useWindowSize();
  return (
    <>
      <div className={s.wrapper}>
        <div className={s.bt_btn}>
          {
            width < 575 ? <img src="/assets/P2E/lucky-chest/btn_open_sm.svg" alt=""/> : <img src="/assets/P2E/lucky-chest/btn_open.svg" alt=""/>
          }
        </div>
        <span>{children}</span>
      </div>
    </>
  );
}

export default ButtonOpenBox;
