import React, { useState } from "react";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import { OrderType } from "utils/Enum";
import s from "./Sort.module.sass";

interface OrderProps {
	id?: string;
	title?: string;
	value?: OrderType;
	onClick: (value: OrderType, id?: string) => void;
}

const Order: React.FC<OrderProps> = ({ id, title, value, onClick }) => {
	const [status, setStatus] = useState<OrderType>(value || OrderType.NONE);

	const handleClickChangeOrder = () => {
		if (status === OrderType.NONE) {
			setStatus(OrderType.DESC);
			onClick(OrderType.DESC, id);
		} else if (status === OrderType.DESC) {
			setStatus(OrderType.ASC);
			onClick(OrderType.ASC, id);
		} else {
			setStatus(OrderType.NONE);
			onClick(OrderType.NONE, id);
		}
	};

	return (
		<div onClick={handleClickChangeOrder}>
			<div className={s.sort}>
				<p className="mb-0 mr-2">{title}</p>
				{status === OrderType.NONE ? (
					<div className="w-[18px]" />
				) : status === OrderType.DESC ? (
					<CaretDownFilled id={id} className="text-18px" />
				) : (
					<CaretUpFilled id={id} className="text-18px" />
				)}
			</div>
		</div>
	);
};

export default Order;
