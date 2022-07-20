import s from "./profile.module.sass";
import {useEffect, useState} from "react";
import InfoMyProfile from "components/ui/tournament/myProfile/infoProfile/Info";
import EditProfile from "components/ui/tournament/myProfile/editMyProfile/EditProfile";
import ContentMyProfile from "../../components/ui/tournament/myProfile/content/ContentMyProfile";
import {useGetUserProfile} from "../../hooks/myProfile/useMyProfile";
import AuthStore, {AuthUser} from "../../components/Auth/AuthStore";
import {isEmpty} from "lodash";
import {UserGraphql} from "../../src/generated/graphql";
import {useRouter} from "next/router";
import {observer} from "mobx-react-lite";
import Head from "next/head";
import DefaultErrorPage from "next/error";
import SpinLoading from "../../components/ui/common/Spin";
import {getLocalAuthInfo, setLocalAuthInfo} from "../../components/Auth/AuthLocal";

export default observer(function MyProfile() {
	const localUserInfo = AuthStore;
	const [page, setPage] = useState<string>('');
	const { loading: loadingUserProfile, refetch: getUserProfileRefetch, getUserProfileData } = useGetUserProfile({
		user_id: Number(localUserInfo?.profile?.user_id),
		skip: isEmpty(localUserInfo?.profile?.user_id),
		onCompleted: (data: {
			getUserProfile: UserGraphql;
		}) => {
			const profile = data.getUserProfile.profile
			let userData = getLocalAuthInfo()
			let newUserData = {
				...userData,
				id: +data.getUserProfile.id,
				email: data.getUserProfile.email,
				profile: {
					avatar: profile?.avatar,
					biography: profile?.biography,
					country_code: profile?.country_code,
					cover: profile?.cover,
					discord: profile?.discord,
					display_name: profile?.display_name,
					facebook: profile?.facebook,
					phone: profile?.phone,
					telegram: profile?.telegram,
					twitch: profile?.twitch,
					twitter: profile?.twitter,
					user_id: profile?.user_id,
					user_name: profile?.user_name,
					youtube: profile?.youtube,
				}
			} as AuthUser
			setLocalAuthInfo(newUserData)
			AuthStore.setAuthUser(newUserData)
		}
	})
	const router = useRouter();
	const currentPage = router.query?.page ?? ''
	const allowedPages = ['', 'teams', 'tournaments', 'edit']
	useEffect(() => {
		if (!AuthStore.isLoggedIn) {
			router.push('/')
		}
	}, [AuthStore.isLoggedIn])
	
	useEffect(() => {
		if (currentPage === '') {
			setPage('overview')
		} else {
			setPage(currentPage as string)
		}
	}, [currentPage])
	
	if (loadingUserProfile) {
		return (
			<main style={{ minHeight: '100vh' }}>
				<SpinLoading />
			</main>
		)
	} else if (isEmpty(getUserProfileData?.getUserProfile) || !allowedPages.includes(currentPage as string)) {
		return (
			<>
				<Head>
					<meta name="robots" content="noindex" />
					<title>404 | This page could not be found.</title>
				</Head>
				<DefaultErrorPage statusCode={404} />
			</>
		)
	}

	const handleEditClick = () => {
		if (page === 'edit') {
			router.push('/profile')
		} else {
			router.push('/profile?page=edit')
		}
	};
	const onEditedProfile = () => {
		handleEditClick();
		// getUserProfileRefetch()
	}

	return (
		<div className={s.wrapper_profile}>
			{/* Content */}
			<InfoMyProfile click={handleEditClick} userInfo={localUserInfo} getUserProfileRefetch={getUserProfileRefetch} isOwner isShowEdit={page === 'edit'} />
			<div className="lucis-container">
				{
					page === 'edit' ?
						<EditProfile userInfo={localUserInfo} onEditedProfile={onEditedProfile} /> :
						<ContentMyProfile userInfo={localUserInfo} getUserProfileRefetch={getUserProfileRefetch} isOwner page={page} />
				}
			</div>
		</div>
	);
})
