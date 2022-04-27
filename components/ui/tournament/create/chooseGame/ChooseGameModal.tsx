import { observer } from "mobx-react-lite";
import { Modal, Radio } from "antd";
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
    console.log(value)
    setIsModalVisible(false);
    if (getDataChooseGame && value != null)
      props.handCallbackChooseGame(getDataChooseGame[value]);
  };

  const delayedSearch = useCallback(
    debounce((value: string) => setName(value), 600),
    []
  );

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current!.focus();
    }
  });

  return (
    <Modal
      title={<span className="font-[600]">ChooseGame</span>}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      className={`${s.container}`}
    >
      <Input
        placeholder="Search by name"
        onChange={onSearch}
        ref={inputRef}
      ></Input>
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
