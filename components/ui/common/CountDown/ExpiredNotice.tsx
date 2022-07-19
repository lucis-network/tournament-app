import React from "react";

interface ExpiredNoticeProps {}

const ExpiredNotice: React.FC<ExpiredNoticeProps> = ({}) => {
	return (
		<div className="expired-notice">
			<span>Time Expired!!!</span>
		</div>
	);
};

export default ExpiredNotice;
