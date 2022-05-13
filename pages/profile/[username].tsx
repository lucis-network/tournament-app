import s from "./profile.module.sass";
import InfoMyProfile from "components/ui/tournament/myProfile/infoProfile/Info";
import ContentMyProfile from "../../components/ui/tournament/myProfile/content/ContentMyProfile";
import { useRouter } from 'next/router'
import {useGetUserProfile} from "../../hooks/myProfile/useMyProfile";
import {isEmpty} from "lodash";
import Head from "next/head";
import DefaultErrorPage from 'next/error'

const MyProfile = () => {
  const router = useRouter();
  const user_name = router.query.username;

  const { loading: loadingUserProfile, refetch: getUserProfileRefetch, getUserProfileData} = useGetUserProfile({
    user_name: `${user_name}`
  })

  if (loadingUserProfile || isEmpty(user_name)) return null

  if (isEmpty(getUserProfileData?.getUserProfile)) return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <title>404 | This page could not be found.</title>
      </Head>
      <DefaultErrorPage statusCode={404} />
    </>
  )

  return (
    <div className={s.wrapper_profile}>
      {/* Content */}
      <InfoMyProfile userInfo={getUserProfileData?.getUserProfile} />

      <div className="lucis-container">
        <ContentMyProfile userInfo={getUserProfileData?.getUserProfile} />
      </div>
    </div>
  );
};
export default MyProfile;
