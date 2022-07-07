import React from "react";
import ShowCounterTimeBefore from "./ShowCounterTimeBefore";
import { useCountDownTimeBefore } from "./useCountDownTimeBefore";

export interface CountdownTimerProps {
	targetDate: number;
}

const CountdownTimeBefore: React.FC<CountdownTimerProps> = ({ targetDate}) => {
	const [days, hours, minutes, seconds] = useCountDownTimeBefore(targetDate);

	if (days + hours + minutes + seconds <= 0) {
		return <ShowCounterTimeBefore days={0} hours={0} minutes={0} seconds={0} />;
	} else {
		return (
			<ShowCounterTimeBefore
				days={days}
				hours={hours}
				minutes={minutes}
				seconds={seconds}
			/>
		);
	}
};

export default CountdownTimeBefore;
