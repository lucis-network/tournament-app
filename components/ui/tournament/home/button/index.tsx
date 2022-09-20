import s from "./button.module.sass";
import { Select } from "antd";
import {
	bracketValues,
	OrderType,
	orderValues,
	Participants, StatusGameType,
} from "utils/Enum";
import {FilterGame, useHomePage} from "hooks/home/useHomePage";
import Order from "components/ui/common/Order";
import Search from "antd/lib/input/Search";
import {useEffect, useMemo, useState} from "react";

const { Option } = Select;

interface ButtonSort {
	filter: FilterGame;
	gameData: any[];
	onFilter: (type: keyof FilterGame, value: string) => void;
	onOrder: (value: OrderType) => void;
	listTabs: StatusGameType[];
}

export default function ButtonSort({
	filter,
	gameData,
	onFilter,
	onOrder,
	listTabs
}: ButtonSort) {
	const handleChange = (type: keyof FilterGame) => (value: string) => {
		onFilter(type, value?.toString() || "");
	};
	return (
		<div className={`${s.container}`}>
				<div className={s.rightGroupItem}>
					<div className={s.prizepool}>
						<Order
							title="Prize pool"
							id="prize_pool"
							value={filter?.prize_pool}
							onClick={onOrder}
						/>
					</div>
					<div className={s.time}>
						<Order
							id="time"
							title="Time"
							value={filter?.time}
							onClick={onOrder}
						/>
					</div>
					<div className={`${s.game_uid}`}>
						<Select
							onChange={handleChange("game_uid")}
							allowClear
							placeholder="Game"
						>
							{gameData?.map((item) => (
								<Option key={item.uid} value={item.uid}>
									{item.name}
								</Option>
							))}
						</Select>
					</div>
					<div className={`${s.item_bracket}`}>
						<Select
							onChange={handleChange("bracket")}
							allowClear
							placeholder="Bracket Type"
						>
							{bracketValues.map((item) => (
								<Option key={item.key} value={item.key}>
									{item.value}
								</Option>
							))}
						</Select>
					</div>
					<div className={s.rightTeamSize}>
						<Select
							onChange={handleChange("size")}
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
					<div className={s.selectType}>
						<Select
							onChange={handleChange("type")}
							allowClear={false}
							value={filter.type}
						>
							{listTabs.map((item, i) => (
								<Option key={i} value={item}>
									{item}
								</Option>
							))}
						</Select>
					</div>
					<div className={s.container_search}>
						<Search
							className={s.search}
							placeholder="Name Of Tournament"
							value={filter.search}
							onChange={(e) => onFilter("search", e.target.value)}
						/>
					</div>
				</div>
		</div>
	);
}
