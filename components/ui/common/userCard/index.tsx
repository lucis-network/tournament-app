import React from "react";
import { StarFilled, CloseOutlined } from "@ant-design/icons";
import { TeamType } from "../tabsItem/myTeamDetail/hooks/useControlTeam";

interface UserCardType {
	user: TeamType;
	enableDelete?: boolean;
	className?: string;
	onOpenRemove?: () => void;
}

export const UserCard: React.FC<UserCardType> = ({
	user,
	enableDelete = false,
	className,
	onOpenRemove,
}) => {
	return (
		<div
			className={`flex border justify-between items-center bg-white mb-4 p-1 ${className}`}
		>
			<div className="flex items-center align-middle">
				<div className="rounded-[30px] w-[30px] h-[30px] overflow-hidden bg-white border border-nav">
					<img
						className="object-cover w-full h-full"
						src={user?.avatar ? user?.avatar : "/assets/avatar.jpg"}
						alt=""
						width={30}
						height={30}
					/>
				</div>
				<h4 className="mb-0 ml-2">{user?.display_name}</h4>
			</div>
			{user?.is_leader ? (
				<StarFilled style={{ color: "black", fontSize: 18 }} />
			) : enableDelete ? (
				<button className="outline-none" onClick={onOpenRemove}>
					<CloseOutlined style={{ color: "black", fontSize: 18 }} />
				</button>
			) : null}
		</div>
	);
};
