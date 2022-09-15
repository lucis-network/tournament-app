import React, {HTMLAttributes, useEffect, useState} from "react";
import {Button, Form, Input, InputNumber, Table} from "antd";
import {StarFilled} from "@ant-design/icons";
import {MyTeamType} from "../../hooks/useCreateNewTeam";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import s from "./TeamModal.module.sass";
import {ErrorTourKey, Item} from "../../hooks/useTeamModal";
import SpinLoading from "components/ui/common/Spin";

interface TeamPrizingProps {
  isSolo: boolean;
  errorPassword: string;
  loadingJoin: boolean;
  error: ErrorTourKey;
  tourPassword?: string;
  teamSize: any;
  password: string;
  selectedTeam: MyTeamType;
  draftSelectedTeam?: MyTeamType;
  onChooseTeam: () => void;
  onBack: () => void;
  onChangePassword: (e: React.FormEvent<HTMLInputElement>) => void;
  onJoinTournament: () => void;
  onSetDataForm: (team: Item[]) => void;
  is_auto_checkin?: boolean;
  requireConnectGame?: boolean;
}

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;

}

const TeamPrizing: React.FC<TeamPrizingProps> = ({
                                                   loadingJoin,
                                                   isSolo,
                                                   error,
                                                   tourPassword,
                                                   errorPassword,
                                                   password,
                                                   teamSize,
                                                   selectedTeam,
                                                   draftSelectedTeam,
                                                   onChooseTeam,
                                                   onBack,
                                                   onJoinTournament,
                                                   onChangePassword,
                                                   onSetDataForm,
                                                   is_auto_checkin,
                                                   requireConnectGame
                                                 }) => {
  const isMatchTeamSize = draftSelectedTeam?.team?.length === teamSize;
  const {team = []} = selectedTeam;
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record: Item) => String(record.user_id) === editingKey;
  const errMessage = error?.size || error?.prize || error?.user;
  // const handleEdit = (record: Partial<Item>, type: "number" | "text") => {
  //   // form.setFieldsValue({ prize: 0, ...record });
  //   setEditingKey(String(record.user_id));
  //   // setEditInputKey(type);
  // };

  const handleValuesChange = (values: Item[]) => {
  };

  const handleSave = async (e: any,name: string, key: React.Key) => {

    try {
      const newData = [...team];
      const index = newData.findIndex((item) => key === String(item.user_id));
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          [name]: name === "prize" ? Number(e.currentTarget.value) : e.currentTarget.value,
        });
        onSetDataForm(newData);
      } else {
        // newData.push(row as any);
        onSetDataForm(newData);
      }

    } catch (errInfo: any) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Member",
      dataIndex: "display_name",
      width: "30%",
      render: (_: any, record: Item) => {
        return (
          <div className="flex items-center align-middle">
            <div className="rounded-[30px] w-[30px] h-[30px] overflow-hidden bg-white border border-nav">
              <img
                className="object-cover w-full h-full"
                src={record.avatar ? record.avatar : "/assets/avatar.jpg"}
                alt=""
                width={30}
                height={30}
              />
            </div>
            <p className="mb-0 ml-2 font-normal">{record.display_name}</p>
          </div>
        );
      },
    },
    {
      title: "Role",
      dataIndex: "is_leader",
      width: "20%",
      render: (_: any, record: Item) => {
        return record.is_leader ? (
          <p className="flex items-center align-middle mb-0 font-normal">
            <StarFilled className="text-18px mr-1"/> Leader
          </p>
        ) : (
          <p className="flex items-center align-middle mb-0 font-normal">
            <StarFilled className="!text-[transparent] text-18px mr-1"/> Member
          </p>
        );
      },
    },
    {
      title: "Prize allocation",
      dataIndex: "prize",
      width: "20%",
      editable: !isSolo,
      render: (_: any, record: Item) => {
        return (
            <InputNumber
              className={s.prize_input}
              addonAfter="%"
              value={record?.prize}
              onPressEnter={(e) => handleSave(e,"prize",String(record.user_id))}
              onBlur={(e) => handleSave(e,"prize",String(record.user_id))}
              placeholder="% Amount"
              max={100}
              min={0}
              controls={false}
              disabled={isSolo}
              readOnly={isSolo}
            />
        );
      },
    },
    {
      title: "ID in game",
      dataIndex: "id_in_game",
      width: "30%",
      editable: true,
      render: (_: any, record: Item) => {
        return (
          !requireConnectGame && !record.avatar_in_game ?
              <Input
                defaultValue={record.id_in_game}
                // value={record.id_in_game}
                className="!rounded-8px"
                placeholder="Enter ID game"
                onPressEnter={(e) => handleSave(e,"id_in_game",String(record.user_id))}
                onBlur={(e) => handleSave(e,"id_in_game",String(record.user_id))}
              />
            :
            <div className="flex items-center align-middle">
              <div className="rounded-[30px] w-[30px] h-[30px] overflow-hidden bg-white border border-nav">
                <img
                  className="object-cover w-full h-full"
                  src={record.avatar_in_game ? record.avatar_in_game : "/assets/avatar.jpg"}
                  alt=""
                  width={30}
                  height={30}
                />
              </div>
              <p className="mb-0 ml-2 font-normal">{record.id_in_game}</p>
            </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "prize" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  //
  // const EditableCell: React.FC<EditableCellProps> = ({
  //                                                      editing,
  //                                                      dataIndex,
  //                                                      title,
  //                                                      inputType,
  //                                                      record,
  //                                                      index,
  //                                                      children,
  //                                                      ...restProps
  //                                                    }) => {
  //   const inputNode =
  //     inputType === "number" ? (
  //       <InputNumber
  //         className={s.prize_input}
  //         addonAfter="%"
  //         value={record?.prize}
  //         onPressEnter={() => handleSave(String(record.user_id))}
  //         onBlur={() => handleSave(String(record.user_id))}
  //         placeholder="% Amount"
  //         max={100}
  //         min={0}
  //         controls={false}
  //       />
  //     ) : (
  //       <Input
  //         value={record?.user_id}
  //         className="!rounded-8px"
  //         placeholder="Enter ID game"
  //         onPressEnter={() => handleSave(String(record.user_id))}
  //         onBlur={() => handleSave(String(record.user_id))}
  //       />
  //     );
  //
  //   return (
  //     <td {...restProps}>
  //       {editing ? (
  //         <Form.Item name={dataIndex} style={{margin: 0}}>
  //           {inputNode}
  //         </Form.Item>
  //       ) : (
  //         children
  //       )}
  //     </td>
  //   );
  // };

  return (
    <div className={s.prizingJoinTeam}>
      <p className={s.titlePrizingJoinTeam}>Squad</p>
      <div className={s.tablePrizingJoinTeam}>
        <Form form={form} component={false} onValuesChange={handleValuesChange}>
          <Table
            className={s.table}
            rowKey={(record: Item) => String(record.user_id)}
            // components={{
            // 	body: {
            // 		cell: EditableCell,
            // 	},
            // }}
            bordered
            dataSource={team}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={false}
          />
        </Form>
      </div>
      <div className="flex align-middle items-center mt-4 text-center">
        {!isSolo && (
          <button
            className={`${s.button} !w-auto`}
            disabled={isMatchTeamSize}
            onClick={onChooseTeam}
          >
            Choose player
          </button>
        )}
        <p className="text-error text-16px flex-1">{errMessage}</p>
      </div>
      <div className="mt-8 mb-4">
        {tourPassword && (
          <div className="flex items-center align-middle mb-4">
            <p className="w-[150px] m-0">Password:</p>

            <div>
              <Input.Password
                value={password}
                className={s.password_input}
                onChange={onChangePassword}
                placeholder="Enter password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>
                }
              />
              {errorPassword && (
                <p className="text-error text-16px mt-1 flex-1">
                  {errorPassword}
                </p>
              )}
            </div>
          </div>
        )}
        <div className="flex items-center">
          <p className="w-[150px] m-0">Entry Fee:</p>
          <p className="m-0">Free</p>
        </div>
        <div>
          {!is_auto_checkin &&
            <p className={s.note}>Note: You need to check-in after joining this tournament. The Check-in phase will open
              1h15m before the tournament starts. Don&apos;t miss it!</p>
          }
        </div>
      </div>
      <div className={s.prizingBtn}>
        {!isSolo && (
          <Button className={` ${s.buttonBack} mr-4`} onClick={onBack}>
            Back to step 1
          </Button>
        )}
        {/* <Button
					className={s.buttonComplete}
					disabled={!!errMessage || !!errorPassword}
					onClick={onJoinTournament}
					loading={loadingJoin}
				>
					{loadingJoin ? (
						<SpinLoading className="pt-0 py-1 h-[28px]" size={24} />
					) : (
						"Complete and Join tournament"
					)}
				</Button> */}
        <Button
          className={s.buttonComplete}
          disabled={!!errMessage || !!errorPassword}
          onClick={onJoinTournament}
          loading={loadingJoin}
        >
          Complete and Join tournament
        </Button>
      </div>
    </div>
  );
};

export default TeamPrizing;
