import s from "./profile.module.sass";
import { useState } from "react";
import InfoMyProfile from "components/ui/tournament/myProfile/infoProfile/Info";
import EditProfile from "components/ui/tournament/myProfile/editMyProfile/EditProfile";
import ContentMyProfile from "../../components/ui/tournament/myProfile/content/ContentMyProfile";
import {useGetUserProfile} from "../../hooks/myProfile/useMyProfile";
import AuthStore from "../../components/Auth/AuthStore";
import {isEmpty} from "lodash";

const localUserInfo = AuthStore;

const MyProfile = () => {
	const { loading: loadingUserProfile, refetch: getUserProfileRefetch, getUserProfileData} = useGetUserProfile({
		user_id: `${localUserInfo.id}`,
		skip: isEmpty(localUserInfo.id),
	})
	const [isShowEdit, setIsShowEdit] = useState(false);

	if (isEmpty(localUserInfo.id) || loadingUserProfile) return null

	const handleClick = () => {
		setIsShowEdit(!isShowEdit);
	};
	return (
		<div className={s.wrapper_profile}>
			{/* Content */}
			<InfoMyProfile click={handleClick} userInfo={getUserProfileData?.getUserProfile} getUserProfileRefetch={getUserProfileRefetch} isOwner />
			<div className="lucis-container">
				{
					isShowEdit ?
						<EditProfile userInfo={getUserProfileData?.getUserProfile} getUserProfileRefetch={getUserProfileRefetch} /> :
						<ContentMyProfile userInfo={getUserProfileData?.getUserProfile} getUserProfileRefetch={getUserProfileRefetch} isOwner />
				}
			</div>
		</div>
	);
};
export default MyProfile;
