import React, { useState } from "react";
import {
	SortAscendingOutlined,
	SortDescendingOutlined,
	FontColorsOutlined,
} from "@ant-design/icons";
import { OrderType } from "utils/Enum";

interface OrderProps {
	id?: string;
	value?: OrderType;
	onClick: (value: OrderType, id?: string) => void;
}

const Order: React.FC<OrderProps> = ({ id, value, onClick }) => {
	const [status, setStatus] = useState<OrderType>(value || OrderType.EMPTY);

	const handleClickChangeOrder = () => {
		onClick(status);
		if (status === OrderType.EMPTY) {
			setStatus(OrderType.DESC);
		} else if (status === OrderType.DESC) {
			setStatus(OrderType.ASC);
		} else {
			setStatus(OrderType.EMPTY);
		}
	};

	return (
		<div onClick={handleClickChangeOrder}>
			{status === OrderType.EMPTY ? (
				<FontColorsOutlined className="text-20px" />
			) : status === OrderType.DESC ? (
				<SortDescendingOutlined className="text-20px" />
			) : (
				<SortAscendingOutlined className="text-20px" />
			)}
		</div>
	);
};

export default Order;
