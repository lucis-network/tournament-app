import { gql } from "@apollo/client";
import { ClaimDonation } from "components/ui/tournament/detail/popup/claimDonationModal/ClaimDonationModal";
import { GDonateTransaction } from "components/ui/tournament/detail/popup/popupDonate";
import { ClaimPrizePool, ClaimPrizeSystem } from "components/ui/tournament/detail/registrationPhase/RegistrationPhase";
import { SponsorInput } from "components/ui/tournament/detail/sponsor/TournamentDetailBecomeSponsor";
import { SponsorCreateInputGql } from "src/generated/graphql";
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

  public async becomeSponsor(sponsor: SponsorCreateInputGql): Promise<any> {
    const donataResponse = await apoloClient.mutate({
      mutation: gql`
        mutation becomeOurSponsor($data: SponsorCreateInputGql!) {
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
    txHash: string,
    block?: number
  ): Promise<any> {
    const depositTournament = await apoloClient.mutate({
      mutation: gql`
        mutation depositTournament(
          $tournamentUid: String!
          $txHash: String!
          $block: Int
        ) {
          depositTournament(
            tournamentUid: $tournamentUid
            txHash: $txHash
            block: $block
          )
        }
      `,
      variables: {
        tournamentUid: tournamentUid,
        txHash: txHash,
        block,
      },
    });

    return depositTournament;
  }

  public async claimDonation(claim: ClaimDonation): Promise<any> {
    const donationResponse = await apoloClient.mutate({
      mutation: gql`
        mutation claimDonation($tournament_uid: String!, $address: String!) {
          claimDonation(tournament_uid: $tournament_uid, address: $address)
        }
      `,
      variables: {
        tournament_uid: claim.tournament_uid,
        address: claim.address,
      },
    });

    return donationResponse;
  }

  public async claimRefereeFee(claim: ClaimDonation): Promise<any> {
    const claimRefereeFeeResponse = await apoloClient.mutate({
      mutation: gql`
        mutation claimRefereeFee($tournament_uid: String!, $address: String!) {
          claimRefereeFee(tournament_uid: $tournament_uid, address: $address)
        }
      `,
      variables: {
        tournament_uid: claim.tournament_uid,
        address: claim.address,
      },
    });

    return claimRefereeFeeResponse;
  }

  public async claimPrizePool(claim: ClaimPrizePool): Promise<any> {
    const claimPrizePool = await apoloClient.mutate({
      mutation: gql`
        mutation claimPrizePool($tournament_uid: String!, $address: String!) {
          claimPrizePool(tournament_uid: $tournament_uid, address: $address)
        }
      `,
      variables: {
        tournament_uid: claim?.tournament_uid,
        address: claim?.address,
      },
    });

    return claimPrizePool;
  }

  public async claimPrizeSystem(claim: ClaimPrizeSystem): Promise<any> {
    const claimPrizeSystem = await apoloClient.mutate({
      mutation: gql`
        mutation claimPrizeSystem($tournament_uid: String!, $address: String!) {
          claimPrizeSystem(tournament_uid: $tournament_uid, address: $address)
        }
      `,
      variables: {
        tournament_uid: claim?.tournament_uid,
        address: claim?.address,
      },
    });

    return claimPrizeSystem;
  }

  public async subscribeToTournament(tournament_uid: string): Promise<any> {
    const res = await apoloClient.mutate({
      mutation: gql`
        mutation subscribeToTournament($tournament_uid: String!) {
          subscribeToTournament(tournament_uid: $tournament_uid)
        }
      `,
      variables: {
        tournament_uid: tournament_uid,
      },
    });

    return res;
  }

  public async unsubscribeToTournament(tournament_uid: string): Promise<any> {
    const res = await apoloClient.mutate({
      mutation: gql`
        mutation unsubscribeToTournament($tournament_uid: String!) {
          unsubscribeToTournament(tournament_uid: $tournament_uid)
        }
      `,
      variables: {
        tournament_uid: tournament_uid,
      },
    });

    return res;
  }

  public async confirmTournamentResult(tournament_uid: string): Promise<any> {
    const res = await apoloClient.mutate({
      mutation: gql`
        mutation confirmResult($tournament_uid: String!) {
          confirmResult(tournament_uid: $tournament_uid)
        }
      `,
      variables: {
        tournament_uid: tournament_uid,
      },
    });

    return res;
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
