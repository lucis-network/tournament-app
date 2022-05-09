import React, { HTMLAttributes, useEffect, useState } from "react";
import { Form, Input, InputNumber, Table } from "antd";
import { StarFilled } from "@ant-design/icons";
import { MyTeamType, TeamType } from "../../hooks/useCreateNewTeam";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import s from "./TeamModal.module.sass";
import { Item } from "../../hooks/useTeamModal";
import { useRef } from "react";

interface TeamPrizingProps {
	dataForm: Item[];
	teamSize: any;
	password: string;
	selectedTeam: MyTeamType;
	onChooseTeam: () => void;
	onBack: () => void;
	onChangePassword: (e: React.FormEvent<HTMLInputElement>) => void;
	onJoinTournament: () => void;
	onSetDataForm: (values: Item[]) => void;
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
	dataForm,
	password,
	teamSize,
	selectedTeam,
	onChooseTeam,
	onBack,
	onJoinTournament,
	onChangePassword,
	onSetDataForm,
}) => {
	const isMatchTeamSize = selectedTeam.team?.length === teamSize;

	const [form] = Form.useForm();
	const inputRef = useRef<any>();

	const [editingKey, setEditingKey] = useState("");
	const isEditing = (record: Item) => String(record.user_id) === editingKey;
	const handleEdit = (record: Partial<Item>) => {
		form.setFieldsValue({ prize: 0, game_member_id: "", ...record });
		setEditingKey(String(record.user_id));
	};

	const handleValuesChange = (values: Item[]) => {
		console.log(values, editingKey);
	};

	const handleSave = async (key: React.Key) => {
		try {
			const row = (await form.validateFields()) as Item;
			const newData = [...dataForm];
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
		} catch (errInfo) {
			console.log("Validate Failed:", errInfo);
		}
	};

	const cancel = () => {
		setEditingKey("");
	};

	useEffect(() => {
		inputRef && inputRef.current && inputRef.current!.focus();
	});

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
			title: "Rele",
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
			editable: true,
			render: (_: any, record: Item) => {
				return (
					<InputNumber
						className={s.prize_input}
						onClick={() => handleEdit(record)}
						addonBefore="%"
						value={record.prize}
						placeholder="% Amount"
						max={100}
						min={0}
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
						onClick={() => handleEdit(record)}
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
					ref={inputRef}
					className={s.prize_input}
					addonBefore="%"
					onPressEnter={() => handleSave(String(record.user_id))}
					onBlur={() => handleSave(String(record.user_id))}
					placeholder="% Amount"
					max={100}
					min={0}
				/>
			) : (
				<Input
					ref={inputRef}
					className="!rounded-8px"
					placeholder="Enter member ID"
					onPressEnter={() => handleSave(String(record.user_id))}
					onBlur={() => handleSave(String(record.user_id))}
				/>
			);

		return (
			<td {...restProps} onBlur={() => handleSave(String(record.user_id))}>
				{editing ? (
					<Form.Item
						name={dataIndex}
						style={{ margin: 0 }}
						rules={[
							{
								required: true,
								message: `Please Input ${title}!`,
							},
						]}
					>
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
						dataSource={dataForm}
						columns={mergedColumns}
						rowClassName="editable-row"
						pagination={{
							onChange: cancel,
						}}
					/>
				</Form>
				<button
					className={`${s.button} !w-auto`}
					disabled={isMatchTeamSize}
					onClick={onChooseTeam}
				>
					Choose player
				</button>
			</div>
			<div>
				<div className="flex items-center align-middle mt-8 mb-4">
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
				<div className="flex items-center">
					<p className="w-[250px] m-0">Entry Fee</p>
					<p className="m-0">Free</p>
				</div>
			</div>
			<div className="flex justify-center mt-16">
				<button className={`${s.button} !w-max mr-4`} onClick={onBack}>
					Back to step 1
				</button>
				<button className={`${s.button} !w-max`} onClick={onJoinTournament}>
					Complete and Join tournament
				</button>
			</div>
		</div>
	);
};

export default TeamPrizing;
