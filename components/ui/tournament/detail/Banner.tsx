import s from "../../../../pages/tournament/[id]/TournamentDetail.module.sass";

type Props = {
  cover?: string
}
const Banner = (props: Props) => {
  const {cover} = props

  return (
    <div className={s.banner}> 
      <div
        className={s.im_cover}
        style={{ backgroundImage: `url(${cover})`}}
        
      ></div>
    </div>
  );
};

export default Banner;
