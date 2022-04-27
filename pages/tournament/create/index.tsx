import DocHead from "components/DocHead";
import s from "./index.module.sass";
import { Row, Col, Switch, InputNumber, InputRef, Form, message } from "antd";
import { Input } from "antd";
import { observer } from "mobx-react-lite";
import { Radio } from "antd";
import { Select } from "antd";
import { BracketType, Participants, Region, Rounds } from "utils/Enum";
import { Button } from "antd";
import UploadImage from "components/ui/common/upload/UploadImage";
import ChooseGameModal from "components/ui/tournament/create/chooseGame/ChooseGameModal";
import TournamentStore from "src/store/TournamentStore";
import RefereeModal from "components/ui/tournament/create/referee/RefereeModal";
import { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Sponsor from "components/ui/tournament/create/sponsor/Sponsor";
import Prizing from "components/ui/tournament/create/prizing/Prizing";
import TournamentService from "components/service/tournament/TournamentService";
import { useRegion } from "hooks/tournament/useCreateTournament";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const { Option } = Select;

type Props = {};

const rounds = [
  {
    title: "Round 2",
    start_at: "2022-04-25T04:00:00",
    type: "UPPER",
  },
  {
    title: "Loser round 1",
    start_at: "2022-04-26T04:00:00",
    type: "LOWER",
  },
  {
    title: "Loser round 2",
    start_at: "2022-04-27T06:00:00",
    type: "LOWER",
  },
  {
    title: "Round 3",
    start_at: "2022-04-26T08:00:00",
    type: "UPPER",
  },
  {
    title: "Loser round 3",
    start_at: "2022-04-26T08:00:00",
    type: "LOWER",
  },
  {
    title: "Loser round 4",
    start_at: "2022-04-27T10:00:00",
    type: "LOWER",
  },
  {
    title: "Final",
    start_at: "2022-04-27T12:00:00",
    type: "UPPER",
  },
];
export default observer(function CreateTournament(props: Props) {
  const inputRef = useRef<any>(null);
  const inputRefName = useRef<any>(null);

  const [messageErrorName, setmessageErrorName] = useState("");
  const [messageErrorTeamSize, setmessageErrorTeamSize] = useState("");
  const [messageErrorThumbnail, setmessageErrorThumbnail] = useState("");
  const [messageErrorCover, setmessageErrorCover] = useState("");

  const [checkPassword, setCheckPassword] = useState(false);

  const [dataReferees, setDataReferees] = useState([]);
  const [dataChooseGame, setDataChooseGame] = useState(null);

  const { getDataRegions } = useRegion({});

  const callbackFunction = (childData: string, value: string) => {
    if (value === "cover") {
      TournamentStore.cover = childData;
      setmessageErrorCover("");
    }

    if (value === "thumbnail") {
      TournamentStore.thumbnail = childData;
      setmessageErrorThumbnail("");
    }
  };

  const handCallbackReferee = (data: any, arr: any) => {
    setDataReferees(data);
    TournamentStore.referees = arr;
  };

  const handCallbackChooseGame = (data: any) => {
    setDataChooseGame(data);
    TournamentStore.game_uid = data.uid;
  };

  const openModal = (value: string) => {
    if (value === "choosegame") TournamentStore.chooseGameModalVisible = true;
    if (value === "referee") TournamentStore.refereeModalVisible = true;
  };

  const createTournament = () => {
    let cr = TournamentStore.getCreateTournament();
    cr.rounds = rounds;
    cr.start_at = new Date();

    if (cr.referees) cr.referees = JSON.parse(JSON.stringify(cr.referees));
    console.log("cr", cr);
    const tournamentService = new TournamentService();

    if (!validationInput(cr)) return;
    const response = tournamentService.createTournament(cr);
    console.log(response);
  };

  const validationInput = (cr: any) => {
    if (!cr.name) {
      setmessageErrorName("Name must not be empty");
      inputRefName.current!.focus();
      return false;
    }

    if (cr.name.length > 125) {
      setmessageErrorName("Tournament name cannot exceeds 125 characters");
      inputRefName.current!.focus();
      return false;
    }

    if (!cr.team_size) {
      setmessageErrorTeamSize("Teamsize must not be empty");
      inputRef.current!.focus();
      return false;
    }

    if (!cr.cover) {
      setmessageErrorCover("Cover be not empty");
      scrollToTop();
      return false;
    }

    if (!cr.thumbnail) {
      setmessageErrorThumbnail("Thumbnail be not empty");
      scrollToTop();
      return false;
    }

    return true;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBlur = (value: string) => {
    if (value === "name" && !TournamentStore.name)
      setmessageErrorName("Name must not be empty");

    if (value === "teamsize" && !TournamentStore.team_size)
      setmessageErrorTeamSize("Teamsize must not be empty");
  };

  const checkValidateName = (value: string) => {
    if (value) setmessageErrorName("");
    if (value.length > 125)
      setmessageErrorName("Tournament name cannot exceeds 125 characters");
  };

  return (
    <>
      {/* <DocHead />
      <div className="pt-28 min-h-screen"></div>
      <Footer /> */}
      <DocHead title="Apply for INO" />
      <div className="container">
        <div className={s.containerApp}>
          <p className="text-30px">Create your tournament</p>
          <div className="">
            <Row>
              <Col span={4}>
                <p>Name</p>
              </Col>
              <Col span={20}>
                <Input
                  style={
                    messageErrorName !== "" ? { borderColor: "#cb3636" } : {}
                  }
                  placeholder="Tournament name"
                  onChange={(e) => {
                    TournamentStore.name = e.target.value;
                    checkValidateName(TournamentStore.name);
                  }}
                  required
                  ref={inputRefName}
                  onBlur={() => handleBlur("name")}
                  value={TournamentStore.name}
                />
                <div className={s.message_error}>{messageErrorName}</div>
              </Col>
            </Row>
            <Row className="pt-6">
              <Col span={4}>
                <p>Cover (Banner)</p>
              </Col>
              <Col span={10}>
                <UploadImage
                  parentCallback={callbackFunction}
                  heigh="480"
                  width="1200"
                  value="cover"
                ></UploadImage>
                <p>Recommended size: 1200x300</p>
                <div className={s.message_error}>{messageErrorCover}</div>
              </Col>
              <Col span={4} className="text-center">
                <p>Thumbnail</p>
              </Col>
              <Col span={6}>
                <UploadImage
                  parentCallback={callbackFunction}
                  heigh="200"
                  width="300"
                  value="thumbnail"
                ></UploadImage>
                <p>Recommended size: 300x200</p>
                <div className={s.message_error}>{messageErrorThumbnail}</div>
              </Col>
            </Row>
            <Row className="pt-4">
              <Col span={4}>
                <p>Choose game</p>
              </Col>
              <Col span={8}>
                <div className="flex flex-row">
                  {dataChooseGame ? (
                    <div className="flex flex-col items-center mr-15px ml-[10px]">
                      {dataChooseGame["logo"] ? (
                        <img
                          width="50"
                          height="50"
                          src={dataChooseGame["logo"]}
                          alt=""
                        />
                      ) : (
                        <img
                          width="50"
                          height="50"
                          src="/assets/avatar.jpg"
                          alt=""
                        />
                      )}
                      <p className="mt-5px">{dataChooseGame["name"]}</p>
                    </div>
                  ) : (
                    ""
                  )}
                  <Button onClick={() => openModal("choosegame")}>
                    Choose game
                  </Button>
                </div>
              </Col>
              <Col span={4}>
                <p className="ml-[10px]">Bracket type</p>
              </Col>
              <Col span={8}>
                <Radio.Group
                  className={s.bracketType}
                  onChange={(e) => {
                    console.log(e.target.value);
                    TournamentStore.bracket_type = e.target.value;
                  }}
                >
                  {BracketType.map((item, index) => {
                    return item.value !== "BATTLE_ROYALE" ? (
                      <Radio
                        value={item.value}
                        key={index}
                        className={s.textColor}
                      >
                        {item.label}
                      </Radio>
                    ) : (
                      <Radio
                        value={item.value}
                        key={index}
                        className={s.textColor}
                        disabled
                      >
                        {item.label}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </Col>
            </Row>
            <Row className="pt-4">
              <Col span={4}>
                <p>Teamsize</p>
              </Col>
              <Col span={3}>
                <Input
                  style={
                    messageErrorTeamSize !== ""
                      ? { borderColor: "#cb3636" }
                      : {}
                  }
                  placeholder="Team size"
                  ref={inputRef}
                  type="number"
                  onChange={(value: any) => {
                    TournamentStore.team_size = Number.parseInt(
                      value.target.value
                    );
                    if (TournamentStore.team_size) setmessageErrorTeamSize("");
                  }}
                  onBlur={() => handleBlur("teamsize")}
                  min={1}
                  required
                />
                <div className={s.message_error}>{messageErrorTeamSize}</div>
              </Col>
              <Col span={5}></Col>
              <Col span={4}>
                <p className="ml-[10px]">Numbers of participants</p>
              </Col>
              <Col span={8}>
                <Select
                  defaultValue={TournamentStore.participants}
                  style={{ width: 150 }}
                  onChange={(value) => {
                    TournamentStore.participants = value;
                  }}
                >
                  {Participants.map((item, index) => {
                    return (
                      <Option value={item} key={index}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            <Row className="pt-4">
              <Col span={12}></Col>
              <Col span={4}>
                <p className="ml-[10px]">Best of for all rounds</p>
              </Col>
              <Col span={8}>
                <Select
                  defaultValue={TournamentStore.turns}
                  style={{ width: 150 }}
                  onChange={(value) => {
                    TournamentStore.turns = value;
                  }}
                >
                  {Rounds.map((item, index) => {
                    return (
                      <Option value={item} key={index}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            <Row className="pt-4">
              <Col span={4}>
                <p>Timeline</p>
              </Col>
              <Col span={8}>
                <Button>Setup Timeline</Button>
              </Col>
              <Col span={4}>
                <p className="ml-[10px]">Region</p>
              </Col>
              <Col span={8}>
                <Select
                  defaultValue={"Global"}
                  style={{ width: 200 }}
                  onChange={(value) => {
                    TournamentStore.regions[0] = value;
                  }}
                >
                  {getDataRegions?.map((item: any, index: number) => {
                    return (
                      <Option value={item.uid} key={index}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            <Row className="pt-4">
              <Col span={4}>
                <p>Entry</p>
              </Col>
              <Col span={8}>
                <Radio.Group
                  defaultValue={TournamentStore.join_fee}
                  className={s.bracketType}
                  onChange={(e) => {
                    TournamentStore.join_fee = e.target.value;
                  }}
                >
                  <Radio value={0} className={s.textColor}>
                    Free
                  </Radio>
                  <Radio
                    value={1}
                    className={`${s.textColor} ${s.textColor1}`}
                    disabled
                  >
                    <div className={`${s.radioFee}`}>
                      <p className="">With Fee</p>
                      {/* <Input
                        placeholder="Input Fee"
                        disabled={TournamentStore.join_fee == 0 ? true : false}
                      /> */}
                    </div>
                  </Radio>
                </Radio.Group>
              </Col>
              <Col span={12}>
                <p className="ml-[10px]">Referee(s)</p>
                <div className="flex flex-row">
                  {dataReferees?.map((item: any, index: number) => {
                    return (
                      <div
                        className="flex flex-col items-center mr-15px ml-[10px]"
                        key={index}
                      >
                        {item.user?.profile?.avatar ? (
                          <img
                            width="50"
                            height="50"
                            src={item.user.profile.avatar}
                            alt=""
                          />
                        ) : (
                          <img
                            width="50"
                            height="50"
                            src="/assets/avatar.jpg"
                            alt=""
                          />
                        )}
                        <p className="mt-5px">
                          {item.user.profile.display_name}
                        </p>
                      </div>
                    );
                  })}
                  <Button onClick={() => openModal("referee")}>+ Add</Button>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <p className="text-30px mt-20px">Prizing</p>
            <Prizing></Prizing>
          </div>

          <div>
            <p className="text-30px mt-20px">Tournament Overview</p>
            <div style={{ minHeight: 50 }}>
              <ReactQuill
                theme="snow"
                value={TournamentStore.desc}
                onChange={(value) => {
                  TournamentStore.desc = value;
                }}
              />
            </div>
          </div>

          <div>
            <p className="text-30px mt-20px">Rules</p>
            <div style={{ minHeight: 50 }}>
              <ReactQuill
                theme="snow"
                value={TournamentStore.rules}
                onChange={(value) => {
                  TournamentStore.rules = value;
                }}
              />
            </div>
          </div>

          <div>
            <p className="text-30px mt-20px">Sponsor</p>
            <Sponsor />
          </div>

          <div className={`${s.password}`}>
            <Row>
              <Col span={4}>
                <p>Tournament password</p>
              </Col>
              <Col span={2}>
                <Switch
                  // defaultChecked={props.item.showName}
                  onChange={(checked) => {
                    setCheckPassword(checked);
                  }}
                  title="password"
                />
              </Col>
              <Col span={18}>
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    TournamentStore.password = e.target.value;
                  }}
                  disabled={!checkPassword}
                />
              </Col>
            </Row>
          </div>

          <div className="mt-20px text-center pb-20px">
            <Button onClick={createTournament}>Create tournament</Button>
          </div>
        </div>

        <ChooseGameModal handCallbackChooseGame={handCallbackChooseGame} />
        <RefereeModal handCallbackReferee={handCallbackReferee} />
      </div>

      {/* <Footer /> */}
    </>
  );
});
