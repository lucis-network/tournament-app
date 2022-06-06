import s from "./profile.module.sass";
import InfoMyProfile from "components/ui/tournament/myProfile/infoProfile/Info";
import ContentMyProfile from "../../components/ui/tournament/myProfile/content/ContentMyProfile";
import { useRouter } from 'next/router'
import {useGetUserProfile} from "../../hooks/myProfile/useMyProfile";
import {isEmpty} from "lodash";
import DefaultErrorPage from 'next/error'
import Head from "next/head";
import AuthStore from "../../components/Auth/AuthStore";
import EditProfile from "../../components/ui/tournament/myProfile/editMyProfile/EditProfile";
import {useState} from "react";
import SpinLoading from "../../components/ui/common/Spin";
const localUserInfo = AuthStore;

const MyProfile = () => {
  const router = useRouter();
  const user_name = router.query.username;
  const [isShowEdit, setIsShowEdit] = useState(false);

  const { loading: loadingUserProfile, refetch: getUserProfileRefetch, getUserProfileData} = useGetUserProfile({
    user_name: `${user_name}`,
    skip: isEmpty(user_name),
  });

  if (isEmpty(user_name)) return null

  if (loadingUserProfile) {
    return (
      <main style={{ minHeight: '100vh' }}>
        <SpinLoading />
      </main>
    )
  } else if (isEmpty(getUserProfileData?.getUserProfile)) return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <title>404 | This page could not be found.</title>
      </Head>
      <DefaultErrorPage statusCode={404} />
    </>
  );

  let isOwner = false;
  if (getUserProfileData?.getUserProfile.id === localUserInfo.id?.toString()) isOwner = true

  const handleClick = () => {
    setIsShowEdit(!isShowEdit);
  };
  return (
    <div className={s.wrapper_profile}>
      {/* Content */}
      <InfoMyProfile userInfo={getUserProfileData?.getUserProfile} isOwner={isOwner} click={handleClick} />

      <div className="lucis-container">
        {
          isShowEdit ?
            <EditProfile userInfo={getUserProfileData?.getUserProfile} getUserProfileRefetch={getUserProfileRefetch} /> :
            <ContentMyProfile userInfo={getUserProfileData?.getUserProfile} getUserProfileRefetch={getUserProfileRefetch} isOwner={isOwner} />
        }
      </div>
    </div>
  );
};
export default MyProfile;
