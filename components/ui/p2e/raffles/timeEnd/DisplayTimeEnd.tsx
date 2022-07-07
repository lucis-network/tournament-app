import React from "react";

interface DateTimeDisplayProps {
	value: number;
	type: string;
}

const DisplayTimeEnd: React.FC<DateTimeDisplayProps> = ({ value, type }) => {
	return (
		<div className="flex items-center">
			<p className="mb-0">{value > 9 ? value : `0${value}`}</p>
			<span>{type}</span>
		</div>
	);
};

export default DisplayTimeEnd;
