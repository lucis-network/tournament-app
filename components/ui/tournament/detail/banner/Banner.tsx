import s from "./Banner.module.sass";

type Props = {
  cover?: string
  className?: string
  bannerClassName?: string
}
const Banner = (props: Props) => {
  const {cover} = props

  return (
    <div className={`${s.wrapper_banner} ${props.className ? props.className : ''}`}>
      <div>
        <div
          className={`${s.im_cover} ${props.bannerClassName ? props.bannerClassName : ''}`}
          style={{
            background: `url("${cover}") center center / cover no-repeat`
          }}
        />
      </div>
    </div>
  );
};

export default Banner;
