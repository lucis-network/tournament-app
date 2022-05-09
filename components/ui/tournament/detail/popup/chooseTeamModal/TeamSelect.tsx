import React from "react";
import { MyTeamType } from "components/ui/common/tabsItem/myTeamDetail/hooks/useControlTeam";
import s from "./TeamModal.module.sass";

interface TeamSelectProps {
	team: MyTeamType;
	isValid: boolean;
	onSelect: () => void;
}

const TeamSelect: React.FC<TeamSelectProps> = ({ team, isValid, onSelect }) => {
	return (
		<div className="p-4 mb-4 border bg-card relative flex flex-col">
			<p>{team.team_name}</p>
			<div className="mb-8">
				{team?.team?.map((user, i) => (
					<div key={i} className="flex items-center align-middle mb-2">
						<div className="rounded-[30px] w-[30px] h-[30px] overflow-hidden">
							<img
								className="object-cover w-full h-full"
								src={user?.avatar}
								alt=""
								width={30}
								height={30}
							/>
						</div>
						<h3 className="mb-0 ml-2 text-white text-[14px]">
							{user?.display_name}
						</h3>
					</div>
				))}
			</div>
			<button
				className={s.button_select}
				onClick={onSelect}
				disabled={!isValid}
			>
				Select team
			</button>
			<div className="absolute -bottom-4 left-0 w-full text-center">
				<span
					className={`rounded-[30px] text-[14px] px-4 ${
						isValid ? "bg-emerald-2 " : "bg-[gray]"
					}`}
				>
					{isValid ? "Valid" : "Invalid"}
				</span>
			</div>
		</div>
	);
};

export default TeamSelect;
