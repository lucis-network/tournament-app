import { observer } from "mobx-react-lite";
import { Checkbox, Modal, Radio } from "antd";
import TournamentStore from "src/store/TournamentStore";
import Search from "antd/lib/input/Search";
import { useEffect, useState } from "react";
import s from "./index.module.sass";
import { useReferees } from "hooks/tournament/useCreateTournament";

type Props = {
  handCallbackReferee?: any;
};

export default observer(function RefereeModal(props: Props) {
  const [name, setName] = useState("");
  const [checkedValue, setCheckedValue] = useState([]);

  const { getDataReferees } = useReferees({
    name: name,
  });

  const isModalVisible = TournamentStore.refereeModalVisible,
    setIsModalVisible = (v: boolean) =>
      (TournamentStore.refereeModalVisible = v);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSearch = (value: string) => setName(value);

  function onChange(checkedValues: any) {
    console.log("checked = ", checkedValues);
    setCheckedValue(checkedValues);
  }

  const handleOk = () => {
    const dataCallback: any[] = [];
    checkedValue?.forEach((item: number) => {
      dataCallback.push(getDataReferees[item]);
    });

    props.handCallbackReferee(dataCallback, checkedValue);
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
        {getDataReferees
          ? getDataReferees.map((ele: any, index: number) => {
              return (
                <div className={`${s.item}`} key={index}>
                  <div className={`${s.avatar} ${s.avBig}`}>
                    {ele.user?.profile.avatar ? (
                      <img src={ele.user.profile.avatar} alt="" />
                    ) : (
                      <img src="/assets/avatar.jpg" alt="" />
                    )}
                  </div>
                  <Checkbox
                    className={`${s.itemCheckbox}`}
                    value={index}
                  ></Checkbox>
                  <p className="mt-5px">{ele.user.profile.full_name}</p>
                </div>
              );
            })
          : ""}
      </Checkbox.Group>
    </Modal>
  );
});
