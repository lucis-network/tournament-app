import { gql } from "@apollo/client";
import AuthStore, { AuthUser } from "components/Auth/AuthStore";
import { CreateTournament } from "src/store/TournamentStore";
import apoloClient, {
  setAuthToken as ApoloClient_setAuthToken,
} from "utils/apollo_client";

export enum AuthError {
  Unknown = "Unknown",
  UserDeniedMsgSignature = "UserDeniedMsgSignature",
}

type LoginResponse = {
  error: AuthError | null;
};

export default class TournamentService {
  public async createTournament(ct: CreateTournament): Promise<any> {
    const createTournamentRes = await apoloClient.mutate({
      mutation: gql`
        mutation createTournament($input: TournamentCreateInputGql!) {
          createTournament(input: $input)
        }
      `,
      variables: {
        input: ct,
      },
    });

    return createTournamentRes;
  }
}
