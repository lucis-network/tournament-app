import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const SpinLoading = () => {
	const antIcon = (
		<LoadingOutlined
			style={{
				fontSize: 48,
			}}
			spin
		/>
	);

	return (
		<div className="w-full pt-32 flex items-center align-middle justify-center">
			<Spin size="large" indicator={antIcon} />
		</div>
	);
};

export default SpinLoading;
