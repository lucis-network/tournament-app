import { observer } from "mobx-react-lite";
import {Checkbox, Modal} from "antd";
import Input from "antd/lib/input/Input";
import { useCallback, useEffect, useRef, useState } from "react";
import s from "./AddFavoriteGame.module.sass";
import { useChooseGame } from "hooks/tournament/useCreateTournament";
import debounce from "lodash/debounce";
import MyProfileStore from "../../../../../../src/store/MyProfileStore";

type Props = {
  handCallbackAddGame?: any;
};

export default observer(function AddFavoriteGameModal(props: Props) {
  const inputRef = useRef<any>(null);
  const [name, setName] = useState("");

  const { getDataChooseGame } = useChooseGame({
    name: name,
  });

  const isModalVisible = MyProfileStore.chooseGameModalVisible,
    setIsModalVisible = (v: boolean) =>
      (MyProfileStore.chooseGameModalVisible = v);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSearch = (e: any) => {
    delayedSearch(e.target.value);
  };

  const [value, setValue] = useState([]);

  const onChange = (value: any) => {
    console.log(value);
    setValue(value);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (getDataChooseGame && value.length > 0)
      props.handCallbackAddGame(value);
  };

  const delayedSearch = useCallback(
    debounce((value: string) => {
      setName(value);
      setValue([]);
    }, 600),
    []
  );

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current!.focus();
    }
  });

  return (
    <Modal
      centered
      title={<span className="font-[600]">Choose Game</span>}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      className={`${s.container}`}
    >
      <Input placeholder="Search by name" onChange={onSearch} ref={inputRef} />
      <div className="mt-10">
        <Checkbox.Group
          onChange={onChange}
          value={value}
          className={`flex flex-wrap`}
        >
          {getDataChooseGame
            ? getDataChooseGame?.map((game: any) => {
              return (
                <div className={`${s.item}`} key={game.uid}>
                  <Checkbox className={`${s.itemRadio}`} value={game.uid}>
                    {game.logo ? (
                      <img
                        src={game.logo}
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
                    <p className="mt-5px">{game.name}</p>
                  </Checkbox>
                </div>
              );
            })
            : ""}
        </Checkbox.Group>
      </div>
    </Modal>
  );
});
