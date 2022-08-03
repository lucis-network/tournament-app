import { observer } from "mobx-react-lite";
import React, { useCallback, useState } from "react";
import MyTournamentList from "./MyTournamentList";
import {
  useSearchOwnedTournament,
  useSearchJoinedTournament,
} from "../../../../../../hooks/myProfile/useMyProfile";
import s from "./MyTournament.module.sass";
import { Button, Col, Input, message, Row } from "antd";
import { debounce, isEmpty } from "lodash";
import Link from "next/link";
import { ApolloQueryResult } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import AuthStore, {AuthUser} from "components/Auth/AuthStore";
import { useRouter } from "next/router";

type MyTournamentProps = {
  isOwner?: boolean;
  userInfo: AuthUser;
  getUserProfileRefetch?: () => Promise<ApolloQueryResult<any>>;
};

const MyTournament = ({
  isOwner,
  userInfo,
  getUserProfileRefetch,
}: MyTournamentProps) => {
  const [keywordOwned, setKeywordOwned] = useState("");
  const [keywordJoined, setKeywordJoined] = useState("");
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

  const router = useRouter();

  const handleSearchOwnedTournament = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    debouncedInputTyping(setKeywordOwned, event.currentTarget.value);
  };
  const handleSearchJoinedTournament = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    debouncedInputTyping(setKeywordJoined, event.currentTarget.value);
  };
  const debouncedInputTyping = useCallback(
    debounce(
      (fn: React.Dispatch<React.SetStateAction<string>>, value: string) => {
        let keyword = "";
        if (value.trim().length > 0) {
          keyword = value;
        }
        fn(keyword);
      },
      500
    ),
    []
  );

  const createTournament = () => {
    console.log("AuthStore.isLoggedIn", AuthStore.isLoggedIn);
    if (!AuthStore.isLoggedIn) {
      message.warn("Please login first");
    } else {
      router.push("/arena/create");
    }
  };

  return (
    <div>
      {isOwner && (
        <Button className="mb-5" onClick={createTournament}>
          Create my tournament
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
          {ownedTournamentData?.searchOwnerTournament.length > 0 && (
            <Col span={24} lg={{ span: 4 }} style={{ marginBottom: 30 }}>
              <div className="flex justify-end">
                <Input
                  placeholder="Search"
                  onChange={handleSearchOwnedTournament}
                />
              </div>
            </Col>
          )}
        </Row>
        {ownedTournamentData?.searchOwnerTournament &&
        ownedTournamentData?.searchOwnerTournament.length > 0 ? (
          <MyTournamentList
            data={ownedTournamentData.searchOwnerTournament}
            type="owned"
            isOwner={isOwner}
            maxItems={4}
            isMyTournament
          />
        ) : (
          <div>Don&apos;t own any tournaments yet. Please join a tournament of <Link href="/">Lucis Network</Link></div>
        )}
      </div>
      <div className={s.myTournament}>
        <Row>
          <Col span={24} lg={{ span: 20 }}>
            <h2>
              <FontAwesomeIcon icon={faPlay} />
              <span>Joined tournament</span>
            </h2>
          </Col>
          {joinedTournamentData?.searchJoinedTournament.length > 0 && (
            <Col span={24} lg={{ span: 4 }}>
              <div className="flex justify-end">
                <Input
                  placeholder="Search"
                  onChange={handleSearchJoinedTournament}
                />
              </div>
            </Col>
          )}
        </Row>
        {joinedTournamentData?.searchJoinedTournament &&
        joinedTournamentData?.searchJoinedTournament.length > 0 ? (
          isOwner ? (
            <MyTournamentList
              data={joinedTournamentData.searchJoinedTournament.filter(
                (item) => item.is_claim === "CLAIM"
              )}
              type="owned"
              isOwner={isOwner}
              maxItems={4}
              isMyTournament
            />
          ) : (
            <MyTournamentList
              data={joinedTournamentData.searchJoinedTournament}
              type="owned"
              isOwner={isOwner}
              maxItems={4}
              isMyTournament
            />
          )
        ) : (
          <div>Don&apos;t own any tournaments yet. Please join a tournament of <Link href="/">Lucis Network</Link></div>
        )}
      </div>
    </div>
  );
};

export default observer(MyTournament);
