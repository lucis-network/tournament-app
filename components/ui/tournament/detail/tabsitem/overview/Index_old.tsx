import s from "./Overview.module.sass";

type Props = {
  desc?: string;
};
export default function Overview(props: Props) {
  const { desc } = props;
  return (
    <div className={s.wrapper}>
      <div dangerouslySetInnerHTML={{ __html: desc ? desc : "" }}></div>
    </div>
  );
}
