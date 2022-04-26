import { observer } from "mobx-react-lite";
import { Checkbox, Modal, Radio } from "antd";
import TournamentStore from "src/store/TournamentStore";
import Search from "antd/lib/input/Search";
import { useState } from "react";
import s from "./index.module.sass";

type Props = {};

export default observer(function RefereeModal(props: Props) {
  const isModalVisible = TournamentStore.refereeModalVisible,
    setIsModalVisible = (v: boolean) =>
      (TournamentStore.refereeModalVisible = v);

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

  function onChange(checkedValues: any) {
    console.log("checked = ", checkedValues);
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title={<span className="font-[600]">Choose referees</span>}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
        className={`${s.searchText}`}
      />
      <Checkbox.Group onChange={onChange} className={`${s.container}`}>
        {data.map((ele, index) => {
          return (
            <div className={`${s.item}`} key={index}>
              <div className={`${s.avatar} ${s.avBig}`}>
                <img src="/assets/MyProfile/defaultAvatar.png" alt="" />
              </div>
              <Checkbox
                className={`${s.itemCheckbox}`}
                value={index}
              ></Checkbox>
              <p className="mt-5px">{ele.label}</p>
            </div>
          );
        })}
      </Checkbox.Group>
    </Modal>
  );
});
