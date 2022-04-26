import { observer } from "mobx-react-lite";
import { Modal, Radio } from "antd";
import TournamentStore from "src/store/TournamentStore";
import Input from "antd/lib/input/Input";
import Search from "antd/lib/input/Search";
import { useState } from "react";
import s from "./index.module.sass";

type Props = {};

export default observer(function ChooseGameModal(props: Props) {
  const isModalVisible = TournamentStore.chooseGameModalVisible,
    setIsModalVisible = (v: boolean) =>
      (TournamentStore.chooseGameModalVisible = v);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSearch = (value: string) => console.log(value);
  const data = [
    { label: "Axie Infinity" },
    { label: "Axie Infinity" },
    { label: "Axie Infinity" },
    { label: "Axie Infinity" },
    { label: "Axie Infinity" },
  ];

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
      <Search placeholder="input search text" onSearch={onSearch} enterButton className={`${s.searchText}`}/>
      <div className="mt-15px">
        <Radio.Group
          onChange={onChange}
          value={value}
          className={`flex flex-wrap`}
        >
          {data.map((ele, index) => {
            return (
              <div className={`${s.item}`} key={index}>
                <img src="/assets/avatar.jpg" width="100" height="100" alt="" />
                <Radio className={`${s.itemRadio}`} value={index}></Radio>
                <p className="mt-5px">{ele.label}</p>
              </div>
            );
          })}
        </Radio.Group>
      </div>
    </Modal>
  );
});
