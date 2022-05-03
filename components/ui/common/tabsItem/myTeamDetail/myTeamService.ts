import { gql } from "@apollo/client";

export const GET_MY_TEAM = gql`
  query getTeam {
    getTeam {
      team_name
    }
  }
`;
