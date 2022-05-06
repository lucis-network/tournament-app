import {observer} from "mobx-react-lite";
import {gql, useQuery} from "@apollo/client";
import {useEffect, useState} from "react";
import MyTournamentList from "./MyTournamentList";
import s from "./MyTournament.module.sass"

export type Tournament = {
  uid: string,
  thumbnail: string,
  name: string,
  start_at: string | number | Date,
  participants: number,
  team_participated?: number,
  tournament_status?: string,
}

const GET_OWNED_TOURNAMENT = gql`
  query {
    getOwnedTournament {
      uid
      name
      thumbnail
      start_at
      participants
      team_participated
      tournament_status
    }
  }
`;

const SEARCH_OWNED_TOURNAMENT = gql`
  query($value: String!) {
    searchOwnerTournament(value: $value) {
      uid
      name
      thumbnail
      start_at
      participants
      team_participated
      tournament_status
    }
  }
`;

const GET_JOINED_TOURNAMENT = gql`
  query {
    getJoinedTournament {
      uid
      name
      thumbnail
      start_at
      participants
      team_participated
      tournament_status
    }
  }
`;

const MyTournament = () => {
  const {
    loading: getOwnedTournamentLoading,
    error: getOwnedTournamentError,
    data: getOwnedTournamentData
  } = useQuery(GET_OWNED_TOURNAMENT);
  const {
    loading: getJoinedTournamentLoading,
    error: getJoinedTournamentError,
    data: getJoinedTournamentData
  } = useQuery(GET_JOINED_TOURNAMENT);
  // const [searchOwnedTournament, { data }] = useQuery(SEARCH_OWNED_TOURNAMENT);
  const [ownedTournament, setOwnedTournament] = useState<Tournament[]>([]);
  const [joinedTournament, setJoinedTournament] = useState<Tournament[]>([]);

  const handleSearch = (value: string) => {
    console.log(value);
  };

  useEffect(() => {
    if (getOwnedTournamentData?.getOwnedTournament) {
      setOwnedTournament(getOwnedTournamentData.getOwnedTournament)
    }
  }, [getOwnedTournamentData]);

  useEffect(() => {
    if (getJoinedTournamentData?.getOwnedTournament) {
      setJoinedTournament(getJoinedTournamentData.getOwnedTournament)
    }
  }, [getJoinedTournamentData]);

  return (
    <div>
      {ownedTournament.length > 0 && (
        <MyTournamentList data={ownedTournament} search={handleSearch} title="My owned tournaments" />
      )}
      {joinedTournament.length > 0 && (
        <MyTournamentList data={joinedTournament} search={handleSearch} title="Joined tournaments" />
      )}
    </div>
  )
}

export default observer(MyTournament);