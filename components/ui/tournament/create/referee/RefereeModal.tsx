import { observer } from "mobx-react-lite";
import { Checkbox, Input, Modal, Radio } from "antd";
import TournamentStore from "src/store/TournamentStore";
import Search from "antd/lib/input/Search";
import { useCallback, useEffect, useState } from "react";
import s from "./index.module.sass";
import { useReferees } from "hooks/tournament/useCreateTournament";
import debounce from "lodash/debounce";

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

  const delayedSearch = useCallback(
    debounce((value: string) => setName(value), 600),
    []
  );

  const onSearch = (e: any) => {
    delayedSearch(e.target.value);
  };

  function onChange(checkedValues: any) {
    setCheckedValue(checkedValues);
  }

  const handleOk = () => {
    const dataCallback: number[] = [];
    const dataRefereeCallback: any[] = [];
    checkedValue.forEach((item: any) => {
      dataCallback.push(Number.parseInt(getDataReferees[item].user_id));
      dataRefereeCallback.push(getDataReferees[item]);
    });
    props.handCallbackReferee(dataRefereeCallback, dataCallback);
    setIsModalVisible(false);
  };

  return (
    <Modal
      title={<span className="font-[600]">Choose referees</span>}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      className={`${s.container}`}
    >
      <Input
        placeholder="Search by name or username"
        onChange={onSearch}
        className={`${s.searchText}`}
      ></Input>
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
                  <p className="mt-5px">{ele.user.profile.display_name}</p>
                </div>
              );
            })
          : ""}
      </Checkbox.Group>
    </Modal>
  );
});
