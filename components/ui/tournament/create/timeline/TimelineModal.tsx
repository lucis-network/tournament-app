import { Modal, DatePicker, Row, Col } from "antd";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { useEffect, useState } from "react";
import timeMoment from "moment-timezone";

import TournamentStore from "src/store/TournamentStore";
import SingleBracket from "components/ui/common/bracket/single-bracket/SingleBracket";

const { RangePicker } = DatePicker;

type Props = {};

const createElements = (numRounds: any, selectDate: any) => {
  const temp = [];

  for (let i = 0; i < numRounds; i++) {
    temp.push(
      <Row className="mt-2">
        <Col span={8}>
          <p className="m-0">
            {i == numRounds - 1 ? "Final" : `Round ${i + 1}`}
          </p>
        </Col>

        <Col span={16}>
          <DatePicker
            showTime
            placeholder="Tournament open time"
            onChange={(date, dateString) => selectDate(date, dateString, i)}
          />
        </Col>
      </Row>
    );
  }

  return temp;
};

const createListTempRounds = (numRounds: any) => {
  const temp = [];
  for (let i = 0; i < numRounds; i++) {}
};

const TimelineModal = ({}: Props) => {
  const isModalVisible = TournamentStore.timelineModalVisible,
    setIsModalVisible = (v: boolean) =>
      (TournamentStore.timelineModalVisible = v);

  const [listTimeRounds, setListTimeRounds] = useState<any[]>([]);

  const numberParticipants = TournamentStore.participants ?? 0;
  const bracketType = TournamentStore.bracket_type === "DOUBLE" ? 2 : 1;
  // ---
  // ----
  // ----- Calculate total rounds follow participants
  const calculateRoundsSingle =
    bracketType === 1 ? Math.log(numberParticipants) / Math.log(2) : "";

  const calculateWinRoundsDouble =
    bracketType === 2 ? Math.log(numberParticipants) / Math.log(2) + 1 : "";

  const calculateLoseRoundsDouble =
    calculateWinRoundsDouble && (calculateWinRoundsDouble - 1) * 2;

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    console.log(listTimeRounds);
  };

  const handleSelectDate = (
    date: any,
    dateString: string,
    round: number | string
  ) => {
    const datePickerRound = {
      titiel: `Round: ${
        Number(round) + 1 == calculateRoundsSingle ? "Final" : Number(round) + 1
      }`,
      start_at: date._d ?? "",
      type: TournamentStore.bracket_type === "SINGLE" && "UPPER",
    };

    setListTimeRounds([...listTimeRounds, datePickerRound]);
  };

  const selectTimeRoundsSingle = createElements(
    calculateRoundsSingle,
    handleSelectDate
  );
  const selectWinRoundsDouble = createElements(
    calculateWinRoundsDouble,
    handleSelectDate
  );
  const selectLoseRoundsDouble = createElements(
    calculateLoseRoundsDouble,
    handleSelectDate
  );

  // console.log("calculateWinRoundsDouble: ", calculateWinRoundsDouble);
  // console.log("calculateLoseRoundsDouble: ", calculateLoseRoundsDouble);

  return (
    <Modal
      //   onOk={handleOk}
      bodyStyle={{ overflow: "auto" }}
      title="Setup Timeline"
      visible={isModalVisible}
      cancelButtonProps={{
        style: {
          display: "none",
        },
      }}
      okText="Confirm"
      onCancel={handleCancel}
      onOk={handleConfirm}
      width={"90%"}
    >
      <i className="text-[14px]">
        * Lucis will review and approve your tournament in less than 24h then
        your tournament can be visible to everyone
      </i>

      {TournamentStore.bracket_type === "SINGLE" && (
        <SingleBracket
          numRounds={calculateRoundsSingle}
          handleSelectDate={handleSelectDate}
        />
      )}
      {/* {selectTimeRoundsSingle} */}

      {calculateWinRoundsDouble && (
        <div>
          <h1 className="m-0 text-white text-[32px]">Win</h1>
          {selectWinRoundsDouble}
        </div>
      )}

      {calculateLoseRoundsDouble && (
        <div className="mt-4 ">
          <h1 className="m-0 text-white text-[32px]">Lose</h1>
          {selectLoseRoundsDouble}
        </div>
      )}
    </Modal>
  );
};

export default observer(TimelineModal);
