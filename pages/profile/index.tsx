import s from "./profile.module.sass";
import { useState } from "react";
import InfoMyProfile from "components/ui/tournament/myProfile/infoProfile/Info";
import EditProfile from "components/ui/tournament/myProfile/editMyProfile/EditProfile";
import ContentMyProfile from "../../components/ui/tournament/myProfile/content/ContentMyProfile";
import {useGetUserProfile} from "../../hooks/myProfile/useMyProfile";
import AuthStore from "../../components/Auth/AuthStore";
import {isEmpty} from "lodash";
import {UserGraphql} from "../../src/generated/graphql";

const MyProfile = () => {
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

	if (loadingUserProfile || isEmpty(userInfo)) return null

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
};
export default MyProfile;
