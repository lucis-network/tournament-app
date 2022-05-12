import s from "./button.module.sass";
import { Select } from "antd";
import {
	bracketValues,
	OrderType,
	orderValues,
	Participants,
} from "utils/Enum";
import { FilterGame } from "hooks/home/useHomePage";
import { useCallback, useState } from "react";
import Order from "components/ui/common/Order";

const { Option } = Select;

interface ButtonSort {
	filter: FilterGame;
	gameData: any[];
	onFilter: (type: keyof FilterGame, value: string) => void;
	onOrder: (value: OrderType) => void;
}

export default function ButtonSort({
	filter,
	gameData,
	onFilter,
	onOrder,
}: ButtonSort) {
	const [type, setType] = useState<keyof FilterGame>("game_uid");

	const handleCheckType = useCallback((type: any) => {
		setType(type);
	}, []);

	const handleChange = (value: string) => {
		onFilter(type, value?.toString() || "");
	};

	return (
		<div className={s.container}>
			<div className={`${s.item} mb-6`}>
				<div className="w-24">
					<img src="/assets/home/ic_filter.svg" alt="" />
					Filter
				</div>
				<div>
					<Select
						onChange={handleChange}
						onClick={() => handleCheckType("game_uid")}
						allowClear
						placeholder="Game"
						className="w-44"
					>
						{gameData?.map((item) => (
							<Option key={item.uid} value={item.uid}>
								{item.name}
							</Option>
						))}
					</Select>
					<Select
						onChange={handleChange}
						onClick={() => handleCheckType("bracket")}
						allowClear
						placeholder="Bracket Type"
						className="w-[165px]"
					>
						{bracketValues.map((item) => (
							<Option key={item.key} value={item.key}>
								{item.value}
							</Option>
						))}
					</Select>
					<Select
						onChange={handleChange}
						onClick={() => handleCheckType("size")}
						allowClear
						placeholder="Size"
					>
						{Participants.map((item, i) => (
							<Option key={i} value={item}>
								{item}
							</Option>
						))}
					</Select>
				</div>
			</div>
			<div className={s.item}>
				<div className="w-24">
					<img src="/assets/home/ic_sort.svg" alt="" />
					Sort
				</div>
				{/* <div>
					<Select
						defaultValue="Prize pool"
						style={{ width: 120 }}
						onChange={handleChange}
						onClick={() => handleCheckType("prize_pool")}
					>
						{orderValues.map((item) => (
							<Option key={item.key} value={item.key}>
								{item.value}
							</Option>
						))}
					</Select>
					<Select
						defaultValue="Time"
						style={{ width: 120 }}
						onChange={handleChange}
						onClick={() => handleCheckType("time")}
					>
						{orderValues.map((item) => (
							<Option key={item.key} value={item.key}>
								{item.value}
							</Option>
						))}
					</Select>
				</div> */}
				<div className="flex items-center align-middle">
					<div className="mr-4">
						<Order
							title="Prize pool"
							id="prize_pool"
							value={filter?.prize_pool}
							onClick={onOrder}
						/>
					</div>
					<div>
						<Order
							id="time"
							title="Time"
							value={filter?.time}
							onClick={onOrder}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
