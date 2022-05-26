import {observer} from "mobx-react-lite";
import React, {useCallback, useState} from "react";
import MyTournamentList from "./MyTournamentList";
import {useSearchOwnedTournament, useSearchJoinedTournament} from "../../../../../../hooks/myProfile/useMyProfile"
import s from "./MyTournament.module.sass"
import {Button, Col, Input, Row} from "antd";
import {debounce, isEmpty} from "lodash";
import Link from "next/link";
import {UserGraphql} from "../../../../../../src/generated/graphql";
import {ApolloQueryResult} from "@apollo/client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

type MyTournamentProps = {
  isOwner?: boolean,
  userInfo: UserGraphql,
  getUserProfileRefetch?: () => Promise<ApolloQueryResult<any>>,
}

const MyTournament = ({ isOwner, userInfo, getUserProfileRefetch }: MyTournamentProps) => {
  const [keywordOwned, setKeywordOwned] = useState('');
  const [keywordJoined, setKeywordJoined] = useState('');
  const { ownedTournamentData } = useSearchOwnedTournament({
    user_id: `${userInfo.id}`,
    value: keywordOwned,
    skip: isEmpty(userInfo.id),
  });
  const { joinedTournamentData } = useSearchJoinedTournament({
    user_id: `${userInfo.id}`,
    value: keywordJoined,
    skip: isEmpty(userInfo.id),
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
      fn(keyword);
    }, 500),
    []
  );

  return (
    <div>
      {isOwner && (
        <Button className="mb-5">
          <Link href="/tournament/create">Create my tournament</Link>
        </Button>
      )}
      <div className={s.myTournament}>
        <Row>
          <Col span={24} lg={{ span: 20 }}>
            <h2>
              <FontAwesomeIcon icon={faPlay} />
              <span>My owned tournament</span>
            </h2>
          </Col>
          <Col span={24} lg={{ span: 4 }}>
            {(ownedTournamentData?.searchOwnerTournament && ownedTournamentData?.searchOwnerTournament.length > 0) && (
              <div className="flex justify-end">
                <Input
                  placeholder="Search"
                  onChange={handleSearchOwnedTournament}
                />
              </div>
            )}
          </Col>
        </Row>
        {(ownedTournamentData?.searchOwnerTournament && ownedTournamentData?.searchOwnerTournament.length > 0) ? (
          <MyTournamentList data={ownedTournamentData.searchOwnerTournament} type="owned" isOwner={isOwner} maxItems={4}/>
        ) : (<div>Don&apos;t own any tournaments yet</div>)}
      </div>
      <div className={s.myTournament}>
        <Row>
          <Col span={24} lg={{ span: 20 }}>
            <h2>
              <FontAwesomeIcon icon={faPlay} />
              <span>Joined tournament</span>
            </h2>
          </Col>
          <Col span={24} lg={{ span: 4 }}>
            {(joinedTournamentData?.searchJoinedTournament && joinedTournamentData?.searchJoinedTournament.length > 0) && (
              <div className="flex justify-end">
                <Input
                  placeholder="Search"
                  onChange={handleSearchJoinedTournament}
                />
              </div>
            )}
          </Col>
        </Row>
        {(joinedTournamentData?.searchJoinedTournament && joinedTournamentData?.searchJoinedTournament.length > 0) ? (
          isOwner ? (
            <MyTournamentList data={joinedTournamentData.searchJoinedTournament.filter(item => item.is_claim === "CLAIM")} type="owned" isOwner={isOwner} maxItems={4} isMyTournament/>
          ) : (
            <MyTournamentList data={joinedTournamentData.searchJoinedTournament} type="owned" isOwner={isOwner} maxItems={4} isMyTournament/>
          )
        ) : (<div>Don&apos;t own any tournaments yet</div>)}
      </div>
    </div>
  )
}

export default observer(MyTournament);