import DateTimeDisplay from "./DateTimeDisplay";

interface ShowCounterProps {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

const ShowCounter: React.FC<ShowCounterProps> = ({
	days,
	hours,
	minutes,
	seconds,
}) => {
	return (
		<div className="flex items-center show-counter">
			<DateTimeDisplay value={days} type={"D"} />
			<DateTimeDisplay value={hours} type={"H"} />
			<DateTimeDisplay value={minutes} type={"M"} />
			<DateTimeDisplay value={seconds} type={"S"} />
		</div>
	);
};

export default ShowCounter;
