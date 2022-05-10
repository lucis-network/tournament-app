import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { TeamType } from "../../hooks/useCreateNewTeam";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import s from "./TeamModal.module.sass";
import { useLazyQuery } from "@apollo/client";

interface ChoosePlayerProps {
	draftTeam: TeamType[];
	teamSize: number;
	onConfirm: (team: TeamType[]) => void;
}

const ChoosePlayer: React.FC<ChoosePlayerProps> = ({
	draftTeam,
	teamSize,
	onConfirm,
}) => {
	const [draftData, setDraftData] = useState<TeamType[]>(draftTeam);
	const [options, setOptions] = useState<any[]>([]);
	const [values, setValues] = useState<CheckboxValueType[]>([]);

	const updateSelectedTeam = (values: CheckboxValueType[]) =>
		draftTeam?.filter((member) =>
			values?.some((key: any) => key === member.user_id)
		);

	const onChangeValues = (values: CheckboxValueType[]) => {
		const optionConvert = draftTeam?.map((opt) => {
			const checkUnvalidKey = values.every((val) => val !== opt.user_id);

			return {
				label: opt.display_name,
				value: opt.user_id,
				disabled: values.length + 1 >= teamSize && checkUnvalidKey,
			};
		});

		setValues(values);
		setDraftData([draftData[0], ...updateSelectedTeam(values)]);
		setOptions(optionConvert);
	};

	const handleConfirm = () => {
		onConfirm(draftData);
	};

	useEffect(() => {
		const optionConvert = draftTeam?.map((acc) => ({
			label: acc.display_name,
			value: acc.user_id,
		}));

		setOptions(optionConvert);
	}, [draftTeam]);

	return (
		<div className={s.checkbox}>
			<Checkbox.Group
				value={values}
				options={options}
				defaultValue={[]}
				onChange={onChangeValues}
			/>

			<div className="w-[200px] mx-auto mt-6">
				<button className={s.button_select} onClick={handleConfirm}>
					Confirm
				</button>
			</div>
		</div>
	);
};

export default ChoosePlayer;
