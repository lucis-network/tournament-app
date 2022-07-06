import React from "react";
import {useCountdownTimeEnd} from "./useCountDownTimeEnd";
import ShowCounterTimeEnd from "./ShowCounterTimeEnd";

export interface CountdownTimerProps {
	targetDate: number;
}

const CountdownTimeEnd: React.FC<CountdownTimerProps> = ({ targetDate}) => {
	const [days, hours, minutes, seconds] = useCountdownTimeEnd(targetDate);

	if (days + hours + minutes + seconds <= 0) {
		return <ShowCounterTimeEnd days={0} hours={0} minutes={0} seconds={0} />;
	} else {
		return (
			<ShowCounterTimeEnd
				days={days}
				hours={hours}
				minutes={minutes}
				seconds={seconds}
			/>
		);
	}
};

export default CountdownTimeEnd;
