import { observer } from "mobx-react-lite";
import { Modal, Radio } from "antd";
import TournamentStore from "src/store/TournamentStore";
import Input from "antd/lib/input/Input";
import Search from "antd/lib/input/Search";
import { useEffect, useRef, useState } from "react";
import s from "./index.module.sass";
import { useChooseGame } from "hooks/tournament/useCreateTournament";

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

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, [name]);

  const onSearch = (value: string) => setName(value);

  const [value, setValue] = useState(0);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (getDataChooseGame)
      props.handCallbackChooseGame(getDataChooseGame[value]);
  };

  return (
    <Modal
      title={<span className="font-[600]">ChooseGame</span>}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Search
        ref={inputRef}
        placeholder="Search by name"
        style={{ color: "white" }}
        onSearch={onSearch}
        enterButton
        className={`${s.searchText}`}
      />
      <div className="mt-15px">
        <Radio.Group
          onChange={onChange}
          //value={value}
          className={`flex flex-wrap`}
        >
          {getDataChooseGame
            ? getDataChooseGame?.map((ele: any, index: number) => {
                return (
                  <div className={`${s.item}`} key={index}>
                    {ele.logo ? (
                      <img src={ele.logo} width="100" height="100" alt="" />
                    ) : (
                      <img
                        src="/assets/avatar.jpg"
                        width="100"
                        height="100"
                        alt=""
                      />
                    )}
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
