import s from "./profile.module.sass";
import {useEffect, useState} from "react";
import InfoMyProfile from "components/ui/tournament/myProfile/infoProfile/Info";
import EditProfile from "components/ui/tournament/myProfile/editMyProfile/EditProfile";
import ContentMyProfile from "../../components/ui/tournament/myProfile/content/ContentMyProfile";
import {useGetUserProfile} from "../../hooks/myProfile/useMyProfile";
import AuthStore from "../../components/Auth/AuthStore";
import {isEmpty} from "lodash";
import {UserGraphql} from "../../src/generated/graphql";
import {useRouter} from "next/router";
import {observer} from "mobx-react-lite";
import Head from "next/head";
import DefaultErrorPage from "next/error";
import SpinLoading from "../../components/ui/common/Spin";

export default observer(function MyProfile() {
	const router = useRouter();
	const localUserInfo = AuthStore;
	const [userInfo, setUserInfo] = useState<any>(localUserInfo);
	const { loading: loadingUserProfile, refetch: getUserProfileRefetch, getUserProfileData } = useGetUserProfile({
		user_name: `${localUserInfo?.profile?.user_name}`,
		skip: isEmpty(localUserInfo?.profile?.user_name),
		onCompleted: (data: {
			getUserProfile: UserGraphql;
		}) => {
			setUserInfo(data.getUserProfile)
		}
	})
	const [isShowEdit, setIsShowEdit] = useState(false);

	useEffect(() => {
		if (!AuthStore.isLoggedIn) {
			router.push('/')
		}
	}, [AuthStore.isLoggedIn])

	if (loadingUserProfile) {
		return (
			<main style={{ minHeight: '100vh' }}>
				<SpinLoading />
			</main>
		)
	} else if (isEmpty(getUserProfileData?.getUserProfile)) {
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

	const handleClick = () => {
		setIsShowEdit(!isShowEdit);
	};

	return (
		<div className={s.wrapper_profile}>
			{/* Content */}
			<InfoMyProfile click={handleClick} userInfo={userInfo} getUserProfileRefetch={getUserProfileRefetch} isOwner />
			<div className="lucis-container">
				{
					isShowEdit ?
						<EditProfile userInfo={userInfo} getUserProfileRefetch={getUserProfileRefetch} /> :
						<ContentMyProfile userInfo={userInfo} getUserProfileRefetch={getUserProfileRefetch} isOwner />
				}
			</div>
		</div>
	);
})
