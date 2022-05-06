import React, {useCallback} from "react";
import {observer} from "mobx-react-lite";
import s from "./MyTournament.module.sass"
import CardPlayed from "../../../../common/cardsItem/played";
import {Tournament} from "./index";
import {Col, Input, Row} from "antd";
import {debounce} from "lodash";

type MyTournamentListProps = {
  data: Tournament[],
  title: string,
  search: (value: string) => void,
}

const MyTournamentList = (props: MyTournamentListProps) => {
  const { data, title, search } = props;

  const debouncedInputTyping = useCallback(
    debounce((value) => {
      search(value);
    }, 500),
    []
  );

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    debouncedInputTyping(event.currentTarget.value);
  };

  return (
    <div className={s.myTournament}>
      <Row>
        <Col span={24} lg={{ span: 12 }}>
          <h2>{title}</h2>
        </Col>
        <Col span={24} lg={{ span: 12 }}>
          <div className="flex justify-end">
            <Input
              placeholder="Search"
              onChange={handleSearch}
            />
          </div>
        </Col>
      </Row>
      <div className={s.tournamentList}>
        {data.length > 0 && data.map((item: Tournament) => {
          return (
            <CardPlayed key={item.uid} tournament={item} canEdit />
          )
        })}
      </div>
    </div>
  )
}

export default observer(MyTournamentList);