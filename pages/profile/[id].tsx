import s from "./profile.module.sass";
import { useState } from "react";
import InfoMyProfile from "components/ui/tournament/myProfile/infoProfile/Info";
import ContentMyProfile from "../../components/ui/tournament/myProfile/content/ContentMyProfile";
import { useRouter } from 'next/router'

const MyProfile = () => {
  const [isShowEdit, setIsShowEdit] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    setIsShowEdit(!isShowEdit);
  };

  return (
    <div className={s.wapper_profile}>
      {/* Content */}
      <InfoMyProfile click={handleClick} />

      <div className="lucis-container">
        <ContentMyProfile />
      </div>
    </div>
  );
};
export default MyProfile;
