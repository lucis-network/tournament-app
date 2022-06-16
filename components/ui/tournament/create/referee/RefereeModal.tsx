import { observer } from "mobx-react-lite";
import {Button, Checkbox, Input, Modal, Pagination, Radio} from "antd";
import TournamentStore from "src/store/TournamentStore";
import Search from "antd/lib/input/Search";
import { useCallback, useEffect, useRef, useState } from "react";
import s from "./index.module.sass";
import { useReferees } from "hooks/tournament/useCreateTournament";
import debounce from "lodash/debounce";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { isEmpty } from "lodash";
import Link from "next/link";

type Props = {
  handCallbackReferee?: any;
};

export type GetRefereeInput = {
  name?: String;
  page?: number;
  limit?: number;
};

const LIMIT = 10;

export default observer(function RefereeModal(props: Props) {
  const inputRef = useRef<any>(null);
  const [name, setName] = useState("");
  const [checkedValue, setCheckedValue] = useState([]);
  const [messageError, setMessageError] = useState("");
  const [checkedParticipants, setCheckedParticipants] = useState(false);
  const [input, setInput] = useState<GetRefereeInput>({
    name: "",
    page: 1,
    limit: LIMIT,
  });

  const { getDataReferees } = useReferees({
    input: input,
    skip: input == {},
  });

  const isModalVisible = TournamentStore.refereeModalVisible,
    setIsModalVisible = (v: boolean) =>
      (TournamentStore.refereeModalVisible = v);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const delayedSearch = useCallback(
    debounce((value: string) => {
      setName(value);
      //setInput(...input; name: value)
      let inputSearch: GetRefereeInput = { name: value, page: 1, limit: LIMIT };
      setInput(inputSearch);
    }, 600),
    []
  );

  const changePage = (page: number) => {
    let inputSearch: GetRefereeInput = { name: name, page: page, limit: LIMIT };
    setInput(inputSearch);
  };

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
      dataCallback.push(Number.parseInt(getDataReferees?.users[item]?.id));
      dataRefereeCallback.push(getDataReferees?.users[item]);
    });
    props.handCallbackReferee(dataRefereeCallback, dataCallback);
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (TournamentStore.participants) {
      TournamentStore.participants / 2 >= checkedValue.length
        ? setCheckedParticipants(true)
        : setCheckedParticipants(false);

      !checkedParticipants
        ? setMessageError(
            `You can choose max ${
              TournamentStore.participants / 2
            } participant(s) `
          )
        : setMessageError("");
    }
  });

  return (
    <Modal
      title={<span className="font-[600]">Choose referees</span>}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName={s.container}
      okButtonProps={{
        disabled: !checkedParticipants,
      }}
      footer={[
        <Button key="cancel" className={s.btnCancel} onClick={handleCancel}>Cancel</Button>,
        <Button key="confirm" className={s.btnConfirm} onClick={handleOk}>Confirm</Button>
      ]}
    >
      <Input
        placeholder="Search by name or username"
        onChange={onSearch}
        className={`${s.searchText}`}
        ref={inputRef}
      />
      <Checkbox.Group
        onChange={onChange}
        className={s.refereeList}
      >
        {getDataReferees
          ? getDataReferees?.users?.map((ele: any, index: number) => {
              return (
                // <div className={`${s.item}`} key={index}>
                //   <div className={`${s.avatar} ${s.avBig}`}>
                //     {ele?.profile?.avatar ? (
                //       <img src={ele?.profile?.avatar} alt="" />
                //     ) : (
                //       <img src="/assets/avatar.jpg" alt="" />
                //     )}
                //   </div>
                //   <Checkbox
                //     className={`${s.itemCheckbox}`}
                //     value={index}
                //   ></Checkbox>
                //   <p className="mt-5px">{ele?.profile?.display_name}</p>
                // </div>
                <div className={s.item} key={ele.id}>
                  <Checkbox
                    className={`${s.avtWrap}`}
                    value={index}
                  >
                    <img
                      alt=""
                      src={ele?.profile?.avatar ? ele?.profile?.avatar : '/assets/avatar.jpg'}
                      width={50}
                      height={50}
                    />
                  </Checkbox>
                  <div className={s.infoWrap}>
                    <h3>
                      {ele?.profile?.display_name}
                    </h3>
                    <p>
                      Username: @{ele?.profile?.user_name}
                    </p>
                    <Link href={`/profile/${ele?.profile?.user_name}`} passHref>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "white" }}
                      >
                        <button className={s.btnProfile}>
                          Profile
                        </button>
                      </a>
                    </Link>
                  </div>
                </div>
              );
            })
          : ""}
      </Checkbox.Group>
      <div className={s.message_error}>{messageError}</div>
      <div className={s.paginationWrap}>
        <Pagination
          defaultCurrent={1}
          total={getDataReferees?.total}
          onChange={changePage}
        />
      </div>
    </Modal>
  );
});
