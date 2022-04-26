import s from "./CircleImage.module.sass";

type Props = {
  src: string;
  width: string;
};
//className={`${props.width} ${props.rounded}`}
const CircleImage = (props: Props) => {
  return (
    <div className={`${s.avatar}`}>
      <img src={props.src} width={props.width} alt="" />
    </div>
  );
};

export default CircleImage;
