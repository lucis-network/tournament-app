import s from "../../../../pages/tournament/detail/TournamentDetail.module.sass";

const Banner = () => {
  return (
    <div className={s.banner}>
      <div
        className={s.im_cover}
        style={{ backgroundImage: "url(/profile/banner.png)" }}
      ></div>
    </div>
  );
};

export default Banner;
