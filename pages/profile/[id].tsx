import s from "./profile.module.sass";
import InfoMyProfile from "components/ui/tournament/myProfile/infoProfile/Info";
import ContentMyProfile from "../../components/ui/tournament/myProfile/content/ContentMyProfile";
import { useRouter } from 'next/router'
import {useGetUserProfile} from "../../hooks/myProfile/useMyProfile";
import {isEmpty} from "lodash";

const MyProfile = () => {
  const router = useRouter();
  const user_id = router.query.id;

  const { loading: loadingUserProfile, refetch: getUserProfileRefetch, getUserProfileData} = useGetUserProfile({
    user_id: `${user_id}`
  })

  if (loadingUserProfile) return null

  if (isEmpty(getUserProfileData?.getUserProfile)) router.push('/notfound')

  return (
    <div className={s.wapper_profile}>
      {/* Content */}
      <InfoMyProfile userInfo={getUserProfileData?.getUserProfile} />

      <div className="lucis-container">
        <ContentMyProfile userInfo={getUserProfileData?.getUserProfile} />
      </div>
    </div>
  );
};
export default MyProfile;
