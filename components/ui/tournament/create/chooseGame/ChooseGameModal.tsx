import { observer } from "mobx-react-lite";
import {Button, Modal, Radio} from "antd";
import TournamentStore from "src/store/TournamentStore";
import Input from "antd/lib/input/Input";
import Search from "antd/lib/input/Search";
import { useCallback, useEffect, useRef, useState } from "react";
import s from "./index.module.sass";
import { useChooseGame } from "hooks/tournament/useCreateTournament";
import debounce from "lodash/debounce";

type Props = {
	handCallbackChooseGame?: any;
};

export default observer(function ChooseGameModal(props: Props) {
	const inputRef = useRef<any>(null);
	const [name, setName] = useState("");

	const { getDataChooseGame } = useChooseGame({
		name: name,
	});

	const isModalVisible = TournamentStore.chooseGameModalVisible,
		setIsModalVisible = (v: boolean) =>
			(TournamentStore.chooseGameModalVisible = v);

	// const value = TournamentStore.game_uid,
	//   setValue = (v: string) => (TournamentStore.game_uid = v);

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const onSearch = (e: any) => {
		delayedSearch(e.target.value);
	};

	const [value, setValue] = useState(null);

	const onChange = (e: any) => {
		setValue(e.target.value);
	};

	const handleOk = () => {
		setIsModalVisible(false);
		if (getDataChooseGame && value != null)
			props.handCallbackChooseGame(getDataChooseGame[value]);
	};

	const delayedSearch = useCallback(
		debounce((value: string) => {
			setName(value);
			setValue(null);
		}, 600),
		[]
	);

	return (
		<Modal
			centered
			title={<h3>Choose Game</h3>}
			visible={isModalVisible}
			onOk={handleOk}
			onCancel={handleCancel}
			className={`${s.container}`}
			wrapClassName={s.modalChooseGame}
			footer={[
				<Button key="cancel" onClick={handleCancel} className={s.btnCancel}>Cancel</Button>,
				<Button key="confirm" onClick={handleOk} className={s.btnConfirm}>Confirm</Button>
			]}
		>
			<Input placeholder="Search by name" onChange={onSearch} ref={inputRef} />
			<div className="mt-15px">
				<Radio.Group
					onChange={onChange}
					value={value}
					className={s.gameList}
				>
					{getDataChooseGame
						? getDataChooseGame?.map((ele: any, index: number) => {
								return (
									<div className={`${s.item}`} key={index}>
										<Radio className={`${s.itemRadio}`} value={index}>
											{ele.logo ? (
												<img
													src={ele.logo}
													width="100"
													height="100"
													alt=""
													style={{ height: "100px" }}
												/>
											) : (
												<img
													src="/assets/avatar.jpg"
													width="100"
													height="100"
													alt=""
												/>
											)}
											<p className="mt-5px">{ele.name}</p>
										</Radio>
									</div>
								);
						  })
						: ""}
				</Radio.Group>
			</div>
		</Modal>
	);
});
