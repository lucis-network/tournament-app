import React from "react";

interface DateTimeDisplayProps {
	value: number;
	type: string;
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ value, type }) => {
	return (
		<div className="flex items-center mr-2">
			<p className="mb-0">{value}</p>
			<span>{type}</span>
		</div>
	);
};

export default DateTimeDisplay;
