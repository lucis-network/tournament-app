import s from "./Rules.module.sass";

type Props = {
  rules?: string;
};
export default function Rules(props: Props) {
  const { rules } = props;
  return (
    <div className={s.wrapper}>
      <div dangerouslySetInnerHTML={{ __html: rules ? rules : "" }}></div>
    </div>
  );
}
