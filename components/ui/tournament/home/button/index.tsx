import s from "./button.module.sass";
import { Select } from "antd";
import { bracketValues, orderValues, Teamsize } from "utils/Enum";
import { FilterGame } from "hooks/home/useHomePage";
import { useCallback, useState } from "react";

const { Option } = Select;

interface ButtonSort {
	onFilter: (type: keyof FilterGame, value: string) => void;
}

export default function ButtonSort({ onFilter }: ButtonSort) {
	const [type, setType] = useState<keyof FilterGame>("game");

	const handleCheckType = useCallback((type: any) => {
		setType(type);
	}, []);

	const handleChange = (value: string) => {
		onFilter(type, value);
	};

	return (
		<div className={s.container}>
			<div className={s.item}>
				<div>
					<img src="/assets/home/ic_filter.svg" alt="" />
					Filter
				</div>
				<div>
					<Select defaultValue="Game" style={{ width: 120 }}>
						<Option value="jack">Jack</Option>
						<Option value="lucy">Lucy</Option>
					</Select>
					<Select
						defaultValue="Bracket"
						style={{ width: 120 }}
						onChange={handleChange}
						onClick={() => handleCheckType("bracket")}
					>
						{bracketValues.map((item) => (
							<Option key={item.key} value={item.key}>
								{item.value}
							</Option>
						))}
					</Select>
					<Select
						defaultValue="Team size"
						style={{ width: 120 }}
						onChange={handleChange}
						onClick={() => handleCheckType("team_size")}
					>
						{Teamsize.map((item, i) => (
							<Option key={i} value={item}>
								{item}
							</Option>
						))}
					</Select>
				</div>
			</div>
			<div className={s.item}>
				<div>
					<img src="/assets/home/ic_sort.svg" alt="" />
					Sort
				</div>
				<div>
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
				</div>
			</div>
		</div>
	);
}
