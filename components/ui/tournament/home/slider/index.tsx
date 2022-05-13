import s from "./sliderBanner.module.sass";
import GradientButton from "../../../common/button/GradientButton";
import { Carousel } from "antd";
import { GTournament } from "src/generated/graphql";
import { orderBy } from "lodash";

interface SliderBannerProps {
	data: GTournament[];
}

export default function SilderBanner({ data }: SliderBannerProps) {
	const orderData: GTournament[] = orderBy(data, "spotlight_position", "asc");

	return (
		<Carousel autoplay>
			{orderData?.map((item) => (
				<div key={item?.uid} className={s.container}>
					<div className={s.im_conver}>
						<div
							className={s.im_banner}
							style={{
								backgroundImage: `url(${item?.cover})`,
							}}
						></div>
						<div className={s.title}>
							<div style={{ position: "relative" }}>
								<div className={s.line}></div>
								<div className={s.line}></div>
								<p>{item?.name}</p>
								<div className={s.detail}>
									<div>
										<p>Prize pool</p>
										<div className={s.total}>
											<img
												src={item?.currency?.icon || ""}
												className="w-7 h-7"
												alt="icon"
											/>
											<span>
												{item?.totalPrizePool} {item?.currency?.symbol}
											</span>
										</div>
									</div>
									<GradientButton
										type={1}
										className={`text-white text-16px leading-28px py-2 ${s.btn}`}
										style={{ whiteSpace: "nowrap", fontWeight: "600" }}
									>
										JOIN NOW
									</GradientButton>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</Carousel>
	);
}
