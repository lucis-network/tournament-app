import React from "react";
import ShowCounter from "./ShowCounter";
import { useCountdown } from "./useCountDown";

export interface CountdownTimerProps {
	targetDate: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
	const [days, hours, minutes, seconds] = useCountdown(targetDate);

	if (days + hours + minutes + seconds <= 0) {
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
