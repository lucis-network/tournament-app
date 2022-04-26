import { observer } from "mobx-react-lite";
import { Modal, Radio } from "antd";
import TournamentStore from "src/store/TournamentStore";
import Input from "antd/lib/input/Input";
import Search from "antd/lib/input/Search";
import { useEffect, useState } from "react";
import s from "./index.module.sass";
import { useChooseGame } from "hooks/tournament/useCreateTournament";

type Props = {};

export default observer(function ChooseGameModal(props: Props) {
  const { getDataChooseGame } = useChooseGame({
    nameGame: undefined,
  });

  const isModalVisible = TournamentStore.chooseGameModalVisible,
    setIsModalVisible = (v: boolean) =>
      (TournamentStore.chooseGameModalVisible = v);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    console.log("getDataChooseGame", getDataChooseGame);
  }, [getDataChooseGame]);

  const onSearch = (value: string) => console.log(value);

  const [value, setValue] = useState(null);

  const onChange = (e: any) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title={<span className="font-[600]">ChooseGame</span>}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Search
        placeholder="Search by name"
        onSearch={onSearch}
        enterButton
        className={`${s.searchText}`}
      />
      <div className="mt-15px">
        <Radio.Group
          onChange={onChange}
          value={value}
          className={`flex flex-wrap`}
        >
          {getDataChooseGame
            ? getDataChooseGame?.map((ele: any, index: number) => {
                return (
                  <div className={`${s.item}`} key={index}>
                    <img
                      src="/assets/avatar.jpg"
                      width="100"
                      height="100"
                      alt=""
                    />
                    <Radio className={`${s.itemRadio}`} value={index}></Radio>
                    <p className="mt-5px">{ele.name}</p>
                  </div>
                );
              })
            : ""}
        </Radio.Group>
      </div>
    </Modal>
  );
});
