import s from "./index.module.sass";
import { useMemo, useState } from "react";

import { isClient } from "utils/DOM";
import { useRouter } from "next/router";
import PlayerHome from "components/ui/tournament/home/player/Index";
import CardPlayer from "components/ui/tournament/home/cardPlayer";

const listData = [
  { id: 1, position: 1, name: "Top1" },
  { id: 2, position: 2, name: "Top2" },
  { id: 3, position: 3, name: "Top3" },
];

const MyVictory = () => {
  const router = useRouter();

  const tournamentId = useMemo(() => {
    const { slug } = router.query;
    console.log(slug);
    if (slug) {
      return slug;
    }
    if (isClient) {
      const paths = router.asPath.split("/").filter((item) => item !== "");
      if (paths.length > 1) {
        return paths[1];
      }
    }
    return "";
  }, [router]);

  const [isShowEdit, setIsShowEdit] = useState(false);
  const handleClick = () => {
    setIsShowEdit(!isShowEdit);
  };
  return (
    <div className={s.wapper_profile}>
      {/* <InfoMyProfile click={handleClick} />

      <div className="lucis-container">
        {isShowEdit ? <EditProfile /> : <ContentTournament />}
      </div> */}
      <PlayerHome />
      {/* <div></div> */}
      {/* <div>
        <CardPlayer data={listData} />
      </div> */}
    </div>
  );
};
export default MyVictory;
