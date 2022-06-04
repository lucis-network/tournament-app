import { observer } from "mobx-react-lite";
import { Checkbox, Input, Modal, Pagination, Radio } from "antd";
import TournamentStore from "src/store/TournamentStore";
import Search from "antd/lib/input/Search";
import { useCallback, useEffect, useRef, useState } from "react";
import s from "./index.module.sass";
import { useReferees } from "hooks/tournament/useCreateTournament";
import debounce from "lodash/debounce";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";

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
      dataCallback.push(Number.parseInt(getDataReferees[item].id));
      dataRefereeCallback.push(getDataReferees[item]);
    });
    props.handCallbackReferee(dataRefereeCallback, dataCallback);
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current!.focus();
    }
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
      className={`${s.container}`}
      okButtonProps={{
        disabled: !checkedParticipants,
      }}
    >
      <Input
        placeholder="Search by name or username"
        onChange={onSearch}
        className={`${s.searchText}`}
        ref={inputRef}
      ></Input>
      <Checkbox.Group
        onChange={onChange}
        className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-2 mt-4"
      >
        {getDataReferees
          ? getDataReferees.map((ele: any, index: number) => {
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
                <div className={`${s.item} border p-2 mt-2`} key={ele.id}>
                  <div className="flex align-middle items-center mb-2">
                    <div className="rounded-[30px] overflow-hidden h-full bg-white">
                      <img
                        alt=""
                        src={ele?.profile?.avatar}
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="w-full ml-2">
                      <h3 className="text-18px m-0 text-white">
                        {ele?.profile?.display_name}
                      </h3>
                      <p className="mb-0 text-[12px]">
                        Username: @{ele?.profile?.user_name}
                      </p>
                    </div>
                  </div>
                  <button className={s.button_add} onClick={() => {}}>
                    <UserOutlined className="mr-2" />

                    <a
                      target="_blank"
                      href={`/profile/${ele?.profile?.user_name}`}
                      rel="noopener noreferrer"
                      style={{ color: "white" }}
                    >
                      Profile
                    </a>
                  </button>
                  <Checkbox
                    className={`${s.itemCheckbox}`}
                    value={index}
                  ></Checkbox>
                </div>
              );
            })
          : ""}
      </Checkbox.Group>
      <div className={s.message_error}>{messageError}</div>
      <div style={{textAlign: "center"}}>
        <Pagination defaultCurrent={1} total={50} onChange={changePage} />
      </div>
    </Modal>
  );
});
