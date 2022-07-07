import DisplayTimeEnd from "../timeEnd/DisplayTimeEnd";

interface ShowCounterProps {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

const ShowCounterTimeBefore: React.FC<ShowCounterProps> = ({
	days,
	hours,
	minutes,
	seconds,
}) => {
	return (
		<div className="flex items-center show-counter">
			<DisplayTimeEnd value={minutes} type={":"} />
			<DisplayTimeEnd value={seconds} type={""} />
		</div>
	);
};

export default ShowCounterTimeBefore;
