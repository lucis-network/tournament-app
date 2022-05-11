import React, { HTMLAttributes, useEffect, useState } from "react";
import { Form, Input, InputNumber, Table } from "antd";
import { StarFilled } from "@ant-design/icons";
import { MyTeamType } from "../../hooks/useCreateNewTeam";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import s from "./TeamModal.module.sass";
import { ErrorTourKey, Item } from "../../hooks/useTeamModal";
import { useRef } from "react";

interface TeamPrizingProps {
	isSolo: boolean;
	error: ErrorTourKey;
	tourPassword?: string;
	teamSize: any;
	password: string;
	selectedTeam: MyTeamType;
	draftSelectedTeam?: MyTeamType;
	onChooseTeam: () => void;
	onBack: () => void;
	onChangePassword: (e: React.FormEvent<HTMLInputElement>) => void;
	onJoinTournament: () => void;
	onSetDataForm: (team: Item[]) => void;
}

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: string;
	title: string;
	inputType: "number" | "text";
	record: Item;
	index: number;
	children: React.ReactNode;
}

const TeamPrizing: React.FC<TeamPrizingProps> = ({
	isSolo,
	error,
	tourPassword,
	password,
	teamSize,
	selectedTeam,
	draftSelectedTeam,
	onChooseTeam,
	onBack,
	onJoinTournament,
	onChangePassword,
	onSetDataForm,
}) => {
	const isMatchTeamSize = draftSelectedTeam?.team?.length === teamSize;
	const { team = [] } = selectedTeam;
	const [form] = Form.useForm();
	const [editingKey, setEditingKey] = useState("");
	const isEditing = (record: Item) => String(record.user_id) === editingKey;
	const errMessage = error?.size || error?.user || error?.prize;
	const [editInputKey, setEditInputKey] = useState<"number" | "text">();
	const handleEdit = (record: Partial<Item>, type: "number" | "text") => {
		form.setFieldsValue({ prize: 0, game_member_id: "", ...record });
		setEditingKey(String(record.user_id));
		setEditInputKey(type);
	};

	const handleValuesChange = (values: Item[]) => {};

	const handleSave = async (key: React.Key) => {
		try {
			const row = (await form.validateFields()) as Item;
			const newData = [...team];
			const index = newData.findIndex((item) => key === String(item.user_id));
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
				onSetDataForm(newData);
				setEditingKey("");
			} else {
				newData.push(row as any);
				onSetDataForm(newData);
				setEditingKey("");
			}
		} catch (errInfo: any) {
			console.log("Validate Failed:", errInfo);
		}
	};

	const columns = [
		{
			title: "Member",
			dataIndex: "display_name",
			width: "30%",
			render: (_: any, record: Item) => {
				return (
					<div className="flex items-center align-middle">
						<div className="rounded-[30px] w-[30px] h-[30px] overflow-hidden bg-white border border-nav">
							<img
								className="object-cover w-full h-full"
								src={record.avatar}
								alt=""
								width={30}
								height={30}
							/>
						</div>
						<p className="mb-0 ml-2">{record.display_name}</p>
					</div>
				);
			},
		},
		{
			title: "Role",
			dataIndex: "is_leader",
			width: "20%",
			render: (_: any, record: Item) => {
				return record.is_leader ? (
					<p className="flex items-center align-middle mb-0">
						<StarFilled className="text-18px mr-1" /> Leader
					</p>
				) : (
					<p className="flex items-center align-middle mb-0">
						<StarFilled className="!text-[transparent] text-18px mr-1" /> Member
					</p>
				);
			},
		},
		{
			title: "Prize allocation",
			dataIndex: "prize",
			width: "20%",
			editable: !isSolo,
			render: (_: any, record: Item) => {
				return (
					<InputNumber
						className={s.prize_input}
						onClick={() => handleEdit(record, "number")}
						addonAfter="%"
						value={record.prize}
						placeholder="% Amount"
						max={100}
						min={0}
						controls={false}
						disabled={isSolo}
						readOnly={isSolo}
					/>
				);
			},
		},
		{
			title: "ID in game",
			dataIndex: "game_member_id",
			width: "30%",
			editable: true,
			render: (_: any, record: Item) => {
				return (
					<Input
						value={record.game_member_id}
						onClick={() => handleEdit(record, "text")}
						className="!rounded-8px"
						placeholder="Enter member ID"
					/>
				);
			},
		},
	];

	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record: Item) => ({
				record,
				inputType: col.dataIndex === "prize" ? "number" : "text",
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	const EditableCell: React.FC<EditableCellProps> = ({
		editing,
		dataIndex,
		title,
		inputType,
		record,
		index,
		children,
		...restProps
	}) => {
		const inputNode =
			inputType === "number" ? (
				<InputNumber
					autoFocus={editInputKey === "number"}
					className={s.prize_input}
					addonAfter="%"
					value={record?.prize}
					onPressEnter={() => handleSave(String(record.user_id))}
					onBlur={() => handleSave(String(record.user_id))}
					placeholder="% Amount"
					max={100}
					min={0}
					controls={false}
				/>
			) : (
				<Input
					autoFocus={editInputKey === "text"}
					value={record?.user_id}
					className="!rounded-8px"
					placeholder="Enter member ID"
					onPressEnter={() => handleSave(String(record.user_id))}
					onBlur={() => handleSave(String(record.user_id))}
				/>
			);

		return (
			<td {...restProps} onBlur={() => handleSave(String(record.user_id))}>
				{editing ? (
					<Form.Item name={dataIndex} style={{ margin: 0 }}>
						{inputNode}
					</Form.Item>
				) : (
					children
				)}
			</td>
		);
	};

	return (
		<div>
			<p className="text-24px mb-2">Squad</p>
			<div className="">
				<Form form={form} component={false} onValuesChange={handleValuesChange}>
					<Table
						className={s.table}
						rowKey={(record: Item) => String(record.user_id)}
						components={{
							body: {
								cell: EditableCell,
							},
						}}
						bordered
						dataSource={team}
						columns={mergedColumns}
						rowClassName="editable-row"
						pagination={false}
					/>
				</Form>

				<div className="flex align-middle items-center mt-8 text-center">
					{!isSolo && (
						<button
							className={`${s.button} !w-auto`}
							disabled={isMatchTeamSize}
							onClick={onChooseTeam}
						>
							Choose player
						</button>
					)}
					<p className="text-error text-16px flex-1">{errMessage}</p>
				</div>
			</div>
			<div className="mt-8 mb-4">
				{tourPassword && (
					<div className="flex items-center align-middle">
						<p className="w-[250px] m-0">Tournament Password</p>

						<div>
							<Input.Password
								value={password}
								className={s.password_input}
								onChange={onChangePassword}
								placeholder="Enter password"
								iconRender={(visible) =>
									visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
								}
							/>
						</div>
					</div>
				)}
				<div className="flex items-center">
					<p className="w-[250px] m-0">Entry Fee</p>
					<p className="m-0">Free</p>
				</div>
			</div>
			<div className="flex justify-center mt-16">
				{!isSolo && (
					<button className={`${s.button} !w-max mr-4`} onClick={onBack}>
						Back to step 1
					</button>
				)}
				<button
					className={`${s.button} !w-max`}
					disabled={!!errMessage}
					onClick={onJoinTournament}
				>
					Complete and Join tournament
				</button>
			</div>
		</div>
	);
};

export default TeamPrizing;