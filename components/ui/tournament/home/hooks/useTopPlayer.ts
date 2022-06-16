import { gql, useQuery } from "@apollo/client";
import { GTopEarning } from "src/generated/graphql";

const useTopPlayer = () => {
  const { data, loading } = useQuery(GET_TOP_PLAYER, {
    fetchPolicy: "cache-and-network",
  });

  return {
    dataTopPlayer: data?.getTopEarningPlayer as GTopEarning[],
    loading,
  };
};

export default useTopPlayer;

const GET_TOP_PLAYER = gql`
  query {
    getTopEarningPlayer {
      display_name
      avatar
      total_earning
      user_name
    }
  }
`;
