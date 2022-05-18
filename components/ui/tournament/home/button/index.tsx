import s from "./button.module.sass";
import { Select } from "antd";
import {
	bracketValues,
	OrderType,
	orderValues,
	Participants,
} from "utils/Enum";
import { FilterGame } from "hooks/home/useHomePage";
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
	const handleChange = (type: keyof FilterGame) => (value: string) => {
		onFilter(type, value?.toString() || "");
	};

	return (
		<div className={s.container}>
			<div className={`${s.item} mb-6`}>
				<div className={`w-24 ${s.ic} mb-4`}>
					<img src="/assets/home/ic_filter.svg" alt="" />
					Filter
				</div>
				<div>
					<Select
						onChange={handleChange("game_uid")}
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
						onChange={handleChange("bracket")}
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
						onChange={handleChange("size")}
						allowClear
						placeholder="Size"
						className="w-20"
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
				<div className={`w-24 ${s.ic} mb-4`}>
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
					<div className={`mr-4 ${s.m}`}>
						<Order
							title="Prize pool"
							id="prize_pool"
							value={filter?.prize_pool}
							onClick={onOrder}
						/>
					</div>
					<div className={s.m}>
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
