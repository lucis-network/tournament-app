import DateTimeDisplay from "components/ui/common/CountDown/DateTimeDisplay";
import DisplayTimeEnd from "./DisplayTimeEnd";

interface ShowCounterProps {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

const ShowCounterTimeEnd: React.FC<ShowCounterProps> = ({
	days,
	hours,
	minutes,
	seconds,
}) => {
	return (
		<div className="flex items-center show-counter">
			{/*<DateTimeDisplay value={days} type={"D"} />*/}
			<DisplayTimeEnd value={hours} type={":"} />
			<DisplayTimeEnd value={minutes} type={":"} />
			<DisplayTimeEnd value={seconds} type={""} />
		</div>
	);
};

export default ShowCounterTimeEnd;
