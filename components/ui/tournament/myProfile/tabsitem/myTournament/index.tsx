import {observer} from "mobx-react-lite";
import React, {useCallback, useState} from "react";
import MyTournamentList from "./MyTournamentList";
import {useSearchOwnedTournament, useSearchJoinedTournament} from "../../../../../../hooks/myProfile/useMyProfile"
import s from "./MyTournament.module.sass"
import {Button, Col, Input, Row} from "antd";
import {debounce} from "lodash";
import Link from "next/link";
import AuthStore from "../../../../../Auth/AuthStore";

export type Tournament = {
  uid: string,
  thumbnail: string,
  name: string,
  start_at: string | number | Date,
  participants: number,
  team_participated?: number,
  tournament_status?: string,
}

const MyTournament = () => {
  const userInfo = AuthStore;
  const [keywordOwned, setKeywordOwned] = useState('');
  const [keywordJoined, setKeywordJoined] = useState('');
  const { ownedTournamentData } = useSearchOwnedTournament({
    user_id: `${userInfo.id}`,
    value: keywordOwned,
  });
  const { joinedTournamentData } = useSearchJoinedTournament({
    user_id: `${userInfo.id}`,
    value: keywordJoined,
  });

  const handleSearchOwnedTournament = (event: React.FormEvent<HTMLInputElement>) => {
    debouncedInputTyping(setKeywordOwned, event.currentTarget.value);
  };
  const handleSearchJoinedTournament = (event: React.FormEvent<HTMLInputElement>) => {
    debouncedInputTyping(setKeywordJoined, event.currentTarget.value);
  };
  const debouncedInputTyping = useCallback(
    debounce((fn: React.Dispatch<React.SetStateAction<string>>, value: string) => {
      let keyword = '';
      if (value.trim().length > 0) {
        keyword = value;
      }
      console.log(keyword)
      fn(keyword);
    }, 500),
    []
  );

  return (
    <div>
      <Button className="mb-5">
        <Link href="/tournament/create">Create my tournament</Link>
      </Button>
      <div className={s.myTournament}>
        <Row>
          <Col span={24} lg={{ span: 20 }}>
            <h2>My owned tournament</h2>
          </Col>
          <Col span={24} lg={{ span: 4 }}>
            <div className="flex justify-end">
              <Input
                placeholder="Search"
                onChange={handleSearchOwnedTournament}
              />
            </div>
          </Col>
        </Row>
        {(ownedTournamentData?.searchOwnerTournament && ownedTournamentData?.searchOwnerTournament.length > 0) ? (
          <MyTournamentList data={ownedTournamentData.searchOwnerTournament} type="owned" />
        ) : (<div>Don&apos;t own any tournaments yet</div>)}
      </div>
      <div className={s.myTournament}>
        <Row>
          <Col span={24} lg={{ span: 20 }}>
            <h2>Joined tournament</h2>
          </Col>
          <Col span={24} lg={{ span: 4 }}>
            <div className="flex justify-end">
              <Input
                placeholder="Search"
                onChange={handleSearchJoinedTournament}
              />
            </div>
          </Col>
        </Row>
        {(joinedTournamentData?.searchJoinedTournament && joinedTournamentData?.searchJoinedTournament.length > 0) ? (
          <MyTournamentList data={joinedTournamentData.searchJoinedTournament} type="joined" />
        ) : (<div>Haven&apos;t participated in any tournament yet.</div>)}
      </div>
    </div>
  )
}

export default observer(MyTournament);