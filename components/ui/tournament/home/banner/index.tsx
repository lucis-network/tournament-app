import s from "./banner.module.sass";
import GradientButton from "../../../common/button/GradientButton";
import Marquee from "react-fast-marquee";
import SilderBanner from "../slider";
import { useEffect, useState } from "react";
import useBanner from "../hooks/useBanner";

const Spotlight = [
	{
		id: 1,
		title:
			"Spotlight announcement spotlight announcement spotlight announcement spotlight announcement spotlight announcement spotlight announcement spolihjt an...",
	},
	{
		id: 2,
		title:
			"Spotlight2  Spotlight announcement spotlight announcement spotlight announcement spotlight announcement spotlight announcement spotlight announcement spolihjt an...",
	},
	{
		id: 3,
		title:
			"Spotlight3  Spotlight announcement spotlight announcement spotlight announcement spotlight announcement spotlight announcement spotlight announcement spolihjt an...",
	},
	{
		id: 4,
		title:
			"Spotlight4  Spotlight announcement spotlight announcement spotlight announcement spotlight announcement spotlight announcement spotlight announcement spolihjt an...",
	},
];

export default function BannerPage() {
	const { dataBanner } = useBanner();
	const [titleSpotlight, setTitleSpotlight] = useState(Spotlight[0].title);
	const [arr, setArr] = useState(0);

	useEffect(() => {
		const length = Spotlight.length;
		const interval = setInterval(() => {
			if (arr >= length) {
				setArr(0);
			} else {
				setArr((prve) => prve + 1);
				const title = Spotlight[arr].title;
				setTitleSpotlight(title);
			}
		}, 20000);
		return () => {
			clearInterval(interval);
		};
	}, [arr]);

	return (
		<div className={s.wrapper_banner}>
			<div className={`${s.container} lucis-container`}>
				<SilderBanner data={dataBanner} />
				<div className={s.marquee}>
					<img src="/assets/Banner/ic_loudspeaker.png" alt="" />
					<div className={s.time}>
						<div></div>
						<div className={s.line}></div>
						April 4th 13:30:45
					</div>
					<Marquee
						speed={100}
						gradientColor={[180, 180, 180]}
						className={s.marquee_title}
					>
						{titleSpotlight}
					</Marquee>
				</div>
			</div>
		</div>
	);
}
