import React, { useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { MyTeamType, TeamType } from "../../hooks/useCreateNewTeam";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import s from "./TeamModal.module.sass";

interface TeamPrizingProps {
	selectedTeam: MyTeamType;
}

interface Item {
	key: string;
	name: string;
	age: number;
	address: string;
}

const originData: Item[] = [];
for (let i = 0; i < 5; i++) {
	originData.push({
		key: i.toString(),
		name: `Edrward ${i}`,
		age: 32,
		address: `London Park no. ${i}`,
	});
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: string;
	title: any;
	inputType: "number" | "text";
	record: Item;
	index: number;
	children: React.ReactNode;
}

const TeamPrizing: React.FC<TeamPrizingProps> = ({ selectedTeam }) => {
	const [form] = Form.useForm();
	const [data, setData] = useState(originData);
	const [editingKey, setEditingKey] = useState("");
	const isEditing = (record: Item) => record.key === editingKey;

	const edit = (record: Partial<Item> & { key: React.Key }) => {
		form.setFieldsValue({ name: "", age: "", address: "", ...record });
		setEditingKey(record.key);
	};

	console.log(data);

	const save = async (key: React.Key) => {
		try {
			const row = (await form.validateFields()) as Item;

			const newData = [...data];
			const index = newData.findIndex((item) => key === item.key);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
				setData(newData);
				setEditingKey("");
			} else {
				newData.push(row as any);
				setData(newData);
				setEditingKey("");
			}
		} catch (errInfo) {
			console.log("Validate Failed:", errInfo);
		}
	};

	const cancel = () => {
		setEditingKey("");
	};

	const handleBlur = () => {
		console.log("runnnnnnn");
	};

	const columns = [
		{
			title: "name",
			dataIndex: "name",
			width: "25%",
		},
		{
			title: "age",
			dataIndex: "age",
			width: "15%",
		},
		{
			title: "address",
			dataIndex: "address",
			width: "40%",
			editable: true,
			render: (_: any, record: Item) => {
				return <p onClick={() => edit(record)}>{record.address}</p>;
			},
		},
		{
			title: "operation",
			dataIndex: "operation",
			render: (_: any, record: Item) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link
							onClick={() => save(record.key)}
							style={{ marginRight: 8 }}
						>
							Save
						</Typography.Link>
						<Popconfirm title="Sure to cancel?" onConfirm={cancel}>
							<a>Cancel</a>
						</Popconfirm>
					</span>
				) : (
					<Typography.Link
						disabled={editingKey !== ""}
						onClick={() => edit(record)}
					>
						Edit
					</Typography.Link>
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
				inputType: col.dataIndex === "age" ? "number" : "text",
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
		const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

		return (
			<td {...restProps} onBlur={handleBlur}>
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
			<div className="bg-[transparent]">
				<Form form={form} component={false}>
					<Table
						components={{
							body: {
								cell: EditableCell,
							},
						}}
						bordered
						dataSource={data}
						columns={mergedColumns}
						rowClassName="editable-row"
						pagination={{
							onChange: cancel,
						}}
					/>
				</Form>
				<button className={`${s.button} !w-auto`} onClick={() => {}}>
					Choose player
				</button>
			</div>
			<div>
				<div className="flex items-center align-middle mt-8 mb-4">
					<p className="w-[250px] m-0">Tournament Password</p>
					<div>
						<Input.Password
							className="w-[300px]"
							placeholder="input password"
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
		</div>
	);
};

export default TeamPrizing;
