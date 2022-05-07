import s from "./profile.module.sass";
import { useState } from "react";
import InfoMyProfile from "components/ui/tournament/myProfile/infoProfile/Info";
import EditProfile from "components/ui/tournament/myProfile/editMyProfile/EditProfile";
import ContentTournament from "components/ui/tournament/myProfile/content/ContentTournament";

const MyProfile = () => {
	const [isShowEdit, setIsShowEdit] = useState(false);
	const handleClick = () => {
		setIsShowEdit(!isShowEdit);
	};
	return (
		<div className={s.wapper_profile}>
			{/* Content */}
			<InfoMyProfile click={handleClick} />

			<div className="lucis-container">
				{isShowEdit ? <EditProfile /> : <ContentTournament />}
			</div>
		</div>
	);
};
export default MyProfile;
