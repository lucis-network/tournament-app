import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { CSSProperties } from "react";

export interface SpinLoadingProps {
	size?: number;
	className?: string;
}

const SpinLoading: React.FC<SpinLoadingProps> = ({ className, size = 48 }) => {
	const antIcon = (
		<LoadingOutlined
			style={{
				fontSize: size,
			}}
			spin
		/>
	);

	return (
		<div
			className={`w-full pt-32 flex items-center align-middle justify-center ${className}`}
		>
			<Spin size="large" indicator={antIcon} />
		</div>
	);
};

export default SpinLoading;
