import s from "./ButtonOpen.module.sass";

type Props = {
  children: string
}
function ButtonOpenBox(props: Props) {
  const { children } = props
  return (
    <>
      <div className={s.wraper}>
        <div className={s.bt_btn}>
          <img src="/assets/P2E/bg_btn.svg" alt="" />
        </div>
        <span>{children}</span>
      </div>
    </>
  );
}

export default ButtonOpenBox;
