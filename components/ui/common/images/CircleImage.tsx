import s from "./CircleImage.module.sass";

type Props = {
  src: string;
  width?: string;
  className?: string;
};
//className={`${props.width} ${props.rounded}`}
const CircleImage = (props: Props) => {
  let { className } = props;
  className = className || '';

  return (
    <div className={`${s.avatar} ${className}`}>
      <img src={props.src} width={props.width} alt="" />
    </div>
  );
};

export default CircleImage;
