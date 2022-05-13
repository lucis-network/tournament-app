import { Button, Col, Row } from "antd";
import Link from "next/link";
import CardHome from "components/ui/common/cardsItem/cardHome";
import ButtonSort from "components/ui/tournament/home/button";
import s from "./Tabs.module.sass";

import { useHomePage } from "hooks/home/useHomePage";
import Search from "antd/lib/input/Search";
import { StatusGameType } from "utils/Enum";

export default function TabHome() {
	const {
		type,
		filter,
		listTabs,
		data,
		gameData,
		loading,
		setType,
		handleChangeFilter,
		handleOrder,
	} = useHomePage();

	return (
		<div className={`${s.container_card_tournament}`}>
			<div className="lucis-container">
				<Row className={s.top_tab}>
					<Col className={s.tabs}>
						{listTabs.map((item: StatusGameType) => (
							<div
								key={item}
								onClick={() => setType(item)}
								className={
									type === item ? `${s.tab_item} ${s.active}` : `${s.tab_item}`
								}
							>
								{type === item && (
									<div className={s.ic_tab}>
										<img src="/assets/home/ic_tab.svg" alt="" />
									</div>
								)}
								<p className="uppercase mb-0">{item}</p>
							</div>
						))}
					</Col>
					<Col>
						<Search
							className={s.search}
							placeholder="Search by game"
							autoFocus
						/>
					</Col>
				</Row>
				<ButtonSort
					filter={filter}
					gameData={gameData}
					onFilter={handleChangeFilter}
					onOrder={handleOrder}
				/>
				<div style={{ minHeight: '500px' }}>
					<CardHome datas={data} loading={loading} />
				</div>
				<div className={s.container_create}>
					<div className={s.line}></div>
					<div className={s.lin1}></div>
					<div className={s.im_create_tournament}>
						<img src="/assets/Banner/im_creat_tournament.png" alt="" />
					</div>
					<Row className={s.creat_tournament}>
						<Col></Col>
						<Col className={s.heading}>
							<h2>CREATE MY TOURNAMENT</h2>
							<p>
								Everyone can create tournaments on Lucis Network. The most
								useful platform to create and manage your own tournaments with
								ease.
							</p>
							<Link href={`tournament/create`}>
								<Button type="primary">CREATE NOW</Button>
							</Link>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	);
}
