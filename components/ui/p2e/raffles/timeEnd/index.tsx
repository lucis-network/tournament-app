import React from "react";
import {useCountdownTimeEnd} from "./useCountDownTimeEnd";
import ShowCounterTimeEnd from "./ShowCounterTimeEnd";
import {ApolloQueryResult} from "@apollo/client";

export interface CountdownTimerProps {
	targetDate: number;
	refetchRaffleDetail: () => Promise<ApolloQueryResult<any>>;
	refetchMyWonTickets: () => Promise<ApolloQueryResult<any>>;
}

const CountdownTimeEnd: React.FC<CountdownTimerProps> = (props) => {
	const {targetDate, refetchRaffleDetail, refetchMyWonTickets} = props;
	const [days, hours, minutes, seconds] = useCountdownTimeEnd(targetDate);

	if (days + hours + minutes + seconds <= 0) {
		// const interval = setInterval(() => {
		// 	refetchRaffleDetail().then(r => {});
		// 	refetchMyWonTickets().then(r => {});
		// }, 3000);
		// clearInterval(interval);
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
