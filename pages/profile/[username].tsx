import s from "./profile.module.sass";
import InfoMyProfile from "components/ui/tournament/myProfile/infoProfile/Info";
import ContentMyProfile from "../../components/ui/tournament/myProfile/content/ContentMyProfile";
import { useRouter } from 'next/router'
import {useGetUserProfile} from "../../hooks/myProfile/useMyProfile";
import {isEmpty} from "lodash";
import DefaultErrorPage from 'next/error'
import Head from "next/head";
import AuthStore, {AuthUser} from "../../components/Auth/AuthStore";
import EditProfile from "../../components/ui/tournament/myProfile/editMyProfile/EditProfile";
import {useEffect, useState} from "react";
import SpinLoading from "../../components/ui/common/Spin";
import MyProfileStore from "../../src/store/MyProfileStore";
const localUserInfo = AuthStore;

const MyProfile = () => {
  const router = useRouter();
  const user_name = router.query.username;
  const [page, setPage] = useState<string>('');
  const [isShowEdit, setIsShowEdit] = useState(false);

  const { loading: loadingUserProfile, refetch: getUserProfileRefetch, getUserProfileData} = useGetUserProfile({
    user_name: `${user_name}`,
    skip: isEmpty(user_name),
  });
  const currentPage = router.query?.page ?? ''
  const allowedPages = ['', 'teams', 'tournaments']

  useEffect(() => {
    if (currentPage === '') {
      setPage('overview')
    } else {
      setPage(currentPage as string)
    }
  }, [currentPage])

  if (isEmpty(user_name)) return null

  if (loadingUserProfile) {
    return (
      <main style={{ minHeight: '100vh' }}>
        <SpinLoading />
      </main>
    )
  } else if (isEmpty(getUserProfileData?.getUserProfile) || !allowedPages.includes(currentPage as string)) return (
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
  const onEditedProfile = () => {
		handleClick();
		MyProfileStore.tabActiveKey = "1";
		getUserProfileRefetch()
	}

  return (
    <div className={s.wrapper_profile}>
      {/* Content */}
      <InfoMyProfile userInfo={getUserProfileData?.getUserProfile as unknown as AuthUser} isOwner={isOwner} click={handleClick} />

      <div className="lucis-container">
        {
          isShowEdit ?
            <EditProfile userInfo={getUserProfileData?.getUserProfile as unknown as AuthUser} onEditedProfile={onEditedProfile} /> :
            <ContentMyProfile userInfo={getUserProfileData?.getUserProfile as unknown as AuthUser} getUserProfileRefetch={getUserProfileRefetch} isOwner={isOwner} page={page} />
        }
      </div>
    </div>
  );
};
export default MyProfile;
