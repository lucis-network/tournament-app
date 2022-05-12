import { gql } from "@apollo/client";
import { GDonateTransaction } from "components/ui/tournament/detail/popup/popupDonate";
import { SponsorInput } from "components/ui/tournament/detail/sponsor/TournamentDetailBecomeSponsor";
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
          createTournament(input: $input) {
            uid
          }
        }
      `,
      variables: {
        input: ct,
      },
    });

    return createTournamentRes;
  }

  public async donateService(dnt: GDonateTransaction): Promise<any> {
    const donataResponse = await apoloClient.mutate({
      mutation: gql`
        mutation donate($input: GDonateTransaction!) {
          donate(input: $input)
        }
      `,
      variables: {
        input: dnt,
      },
    });

    return donataResponse;
  }

  public async becomeSponsor(sponsor: SponsorInput): Promise<any> {
    const donataResponse = await apoloClient.mutate({
      mutation: gql`
        mutation becomeOurSponsor($data: SponsorInput!) {
          becomeOurSponsor(data: $data)
        }
      `,
      variables: {
        data: sponsor,
      },
    });

    return donataResponse;
  }

  public async depositTournament(
    tournamentUid: string,
    txHash: string
  ): Promise<any> {
    const donataResponse = await apoloClient.mutate({
      mutation: gql`
        mutation depositTournament($tournamentUid: String!, $txHash: String!) {
          depositTournament(tournamentUid: $tournamentUid, txHash: $txHash)
        }
      `,
      variables: {
        tournamentUid: tournamentUid,
        txHash: txHash,
      },
    });

    return donataResponse;
  }
}

export function setLocalCreateTournamentInfo(ct: CreateTournament): void {
  // localStorage.setItem('user', window.btoa(JSON.stringify(user)))
  localStorage.setItem("createTournament", toBinary(JSON.stringify(ct)));
}

export function getLocalCreateTournamentInfo(): CreateTournament | null {
  try {
    const user_encoded = localStorage.getItem("createTournament");
    if (typeof user_encoded === "string") {
      // const user_plaintext = window.atob(user_encoded);
      const user_plaintext = fromBinary(user_encoded);

      return JSON.parse(user_plaintext);
    }

    return null;
  } catch (e) {
    return null;
  }
}

export function clearLocalCreateTournament(): void {
  localStorage.setItem("createTournament", "");
}

// ----- Solution: https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
function toBinary(string: string) {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  // @ts-ignore
  return window.btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
}

function fromBinary(encoded: string) {
  const binary = window.atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  // @ts-ignore
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}
