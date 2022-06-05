import s from "./banner.module.sass";
import GradientButton from "../../../common/button/GradientButton";
import Marquee from "react-fast-marquee";
import SilderBanner from "../slider";
import { useEffect, useState } from "react";
import useBanner from "../hooks/useBanner";
import { useGetSpotlightAnnouncement } from "hooks/tournament/useTournamentDetail";

export default function BannerPage() {
	const { dataBanner } = useBanner();
	const { loading, error, data, refetch } = useGetSpotlightAnnouncement();

	const [titleSpotlight, setTitleSpotlight] = useState("");
	const [arr, setArr] = useState(0);
  
	useEffect(() => {
	  let interval: NodeJS.Timer;
	  if (data) {
		const length = data.length;
		interval = setInterval(() => {
		  if (arr >= length) {
			setArr(0);
			setTitleSpotlight(data[0]);
		  } else {
			setArr((prve) => prve + 1);
			const title = data[arr];
			setTitleSpotlight(title);
		  }
		}, 10000);
	  }
  
	  return () => {
		clearInterval(interval);
	  };
	}, [arr, data]);

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
