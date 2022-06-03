import s from "./BlankStare.module.sass";

type Props = {
  titleBlankStare?: string;
};
export default function BlankState(props: Props) {
  const { titleBlankStare } = props;
  return <h1>tao là blankStare đây</h1>;
}
