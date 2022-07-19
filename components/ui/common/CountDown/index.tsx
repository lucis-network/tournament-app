import React from "react";
import ShowCounter from "./ShowCounter";
import { useCountdown } from "./useCountDown";

export interface CountdownTimerProps {
	targetDate: number;
	refetch?: any;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, refetch }) => {
	const [days, hours, minutes, seconds] = useCountdown(targetDate);

	console.log(days, hours, minutes, seconds)
	if (days + hours + minutes + seconds <= 0) {
		refetch();
		return <ShowCounter days={0} hours={0} minutes={0} seconds={0} />;
	} else {
		return (
			<ShowCounter
				days={days}
				hours={hours}
				minutes={minutes}
				seconds={seconds}
			/>
		);
	}
};

export default CountdownTimer;
