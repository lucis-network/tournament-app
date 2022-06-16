import {Button, Col, DatePicker, Modal, Row} from "antd";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";

import TournamentStore, {Rounds} from "src/store/TournamentStore";
import SingleBracket from "components/ui/common/bracket/single-bracket/SingleBracket";
import DoubleBracket, {handleDatepickerScroll} from "components/ui/common/bracket/double-bracket/DoubleBracket";
import s from "./index.module.sass"

const { RangePicker } = DatePicker;

type Props = {
  handCallbackTimeline: any;
};

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
          {/* @ts-ignore */}
          <DatePicker
            showTime
            placeholder="Tournament open time"
            onChange={(date, dateString) => selectDate(date, dateString, i)}
            inputReadOnly={true}
            onOpenChange={(open: boolean) => handleDatepickerScroll(open)}
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

const TimelineModal = (props: Props) => {
  const { handCallbackTimeline } = props;
  const isModalVisible = TournamentStore.timelineModalVisible,
    setIsModalVisible = (v: boolean) =>
      (TournamentStore.timelineModalVisible = v);

  const [upperRounds, setUpperRounds] = useState<Rounds[]>([]);
  const [lowerRounds, setLowerRounds] = useState<Rounds[]>([]);
  const [doubleBracketFinal, setDoubleBracketFinal] = useState<Rounds | undefined>(undefined);
  const [listTimeRounds, setListTimeRounds] = useState<Rounds[]>([]);

  useEffect(() => {
    setUpperRounds([])
    setLowerRounds([])
    setListTimeRounds([])
  }, [TournamentStore.bracket_type])

  const numberParticipants = TournamentStore.participants ?? 0;
  const bracketType = TournamentStore.bracket_type === "DOUBLE" ? 2 : 1;

  /**
   *
   *
   * ===== Calculate total rounds follow participants
   *
   *
   */
  const calculateRoundsSingle =
    bracketType === 1 ? Math.log(numberParticipants) / Math.log(2) : "";

  const calculateWinRoundsDouble =
    bracketType === 2 ? Math.log(numberParticipants) / Math.log(2) : "";

  const calculateLoseRoundsDouble =
    calculateWinRoundsDouble && (calculateWinRoundsDouble - 1) * 2;

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    console.log(listTimeRounds);
    setIsModalVisible(false);
    handCallbackTimeline(listTimeRounds);
  };

  const createTitle = (round: any) => {
    if (TournamentStore.bracket_type === "SINGLE") {
      Number(round) == calculateRoundsSingle ? "Final" : Number(round);
    } else {
      return Number(round);
    }
  };

  const handleSelectDate = (
    bracketType: string,
    date: any,
    dateString: string,
    round: number,
    roundName: string,
    branch: string,
  ) => {
    const datePickerRound: Rounds = {
      // title: `Round: ${round == calculateRoundsSingle ? "Final" : round}`,
      title: roundName,
      start_at: date?._d.toISOString() ?? "",
      // type: TournamentStore.bracket_type === "SINGLE" ? "UPPER" : "LOWER" ,
      type:
        roundName === "Final" ? "UPPER" :
        TournamentStore.bracket_type === "DOUBLE" && branch == "lower"
          ? "LOWER"
          : TournamentStore.bracket_type === "DOUBLE" && branch == "upper"
          ? "UPPER"
          : TournamentStore.bracket_type === "SINGLE"
          ? "UPPER"
          : "LOWER",
    };

    if (bracketType === 'single') {
      let newState = [...listTimeRounds]
      if (round > 0) {
        newState[round - 1] = datePickerRound
      }
      if (roundName === 'Final') {
        if (newState.length === 0) {
          newState.push(datePickerRound)
        } else {
          if (newState[newState.length - 1]?.title === 'Final') {
            newState[newState.length - 1] = datePickerRound
          } else {
            newState.push(datePickerRound)
          }
        }
      }
      setListTimeRounds(newState)
    }

    if (bracketType === 'double') {
      let newUpperRounds = [...upperRounds]
      let newLowerRounds = [...lowerRounds]
      if (branch === 'upper') {
        if (newUpperRounds[round - 1]?.title === 'Final') {
          newUpperRounds[round] = newUpperRounds[round - 1]
          newUpperRounds[round - 1] = datePickerRound
        } else {
          newUpperRounds[round - 1] = datePickerRound
        }
      }
      if (branch === 'lower') {
        newLowerRounds[round - 1] = datePickerRound
      }
      if (roundName === 'Final') {
        if (newUpperRounds.length === 0) {
          newUpperRounds.push(datePickerRound)
        } else {
          if (newUpperRounds[newUpperRounds.length - 1]?.title === "Final") {
            newUpperRounds[newUpperRounds.length - 1] = datePickerRound
          } else {
            newUpperRounds.push(datePickerRound)
          }
        }
      }
      const newState = newUpperRounds.concat(newLowerRounds)
      setUpperRounds(newUpperRounds)
      setLowerRounds(newLowerRounds)
      setListTimeRounds(newState)
    }
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

  return (
    <Modal
      title={<h3>Setup Timeline</h3>}
      visible={isModalVisible}
      cancelButtonProps={{
        style: {
          display: "none",
        },
      }}
      okText="Confirm"
      onCancel={handleCancel}
      onOk={handleConfirm}
      width={"60%"}
      wrapClassName={s.modalTimeline}
      footer={[
        <Button key="confirm" className={s.btnConfirm} onClick={handleConfirm}>Confirm</Button>
      ]}
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

      {TournamentStore.bracket_type === "DOUBLE" && (
        <DoubleBracket
          numWinRounds={calculateWinRoundsDouble}
          numLoseRounds={calculateLoseRoundsDouble}
          handleSelectDate={handleSelectDate}
        />
      )}
    </Modal>
  );
};

export default observer(TimelineModal);
