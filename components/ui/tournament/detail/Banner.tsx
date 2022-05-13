import s from "./Banner.module.sass";

type Props = {
  cover?: string
}
const Banner = (props: Props) => {
  const {cover} = props

  return (
    <div className={s.wrapper_banner}>
      <div className="lucis-container">
        <div
          className={s.im_cover}
          style={{
            background: `url("${cover}") center center / cover no-repeat`
          }}
        />
      </div>
    </div>
  );
};

export default Banner;
