import { gql, useQuery, useSubscription } from "@apollo/client";
import { GetRefereeInput } from "components/ui/tournament/create/referee/RefereeModal";
import { useEffect } from "react";

type Props = {
  name?: string;
};

type PropsReferees = {
  input?: GetRefereeInput;
};

export function useChooseGame(props: Props) {
  const { loading, error, data } = useQuery(CHOOSE_GAME, {
    variables: { name: props?.name },
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    getDataChooseGame: data?.getGame,
  };
}

export function useReferees(props: PropsReferees) {
  const { loading, error, data } = useQuery(REFEREES, {
    variables: { input: props?.input },
    fetchPolicy: "no-cache",
  });

  return {
    loading,
    error,
    getDataReferees: data?.getReferee,
  };
}

export function useRegion(props: Props) {
  const { loading, error, data } = useQuery(REGION, {
    variables: {},
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    getDataRegions: data?.regions,
  };
}

export function useCurrencies(props: Props) {
  const { loading, error, data } = useQuery(CURRENCIES, {
    variables: {},
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    getDataCurrencies: data?.currencies,
  };
}

export function useGetContract(props: Props) {
  const { loading, error, data } = useQuery(GET_CONTRACT, {
    variables: {},
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    getContract: data?.getContracts,
  };
}

export const CHOOSE_GAME = gql`
  query ($name: String!) {
    getGame(name: $name) {
      uid
      name
      logo
      desc
    }
  }
`;

const REFEREES = gql`
  query ($input: GetRefereeInput!) {
    getReferee(input: $input) {
      total
      users {
        id
        code
        email
        profile {
          display_name
          avatar
          user_name
        }
      }
    }
  }
`;

const REGION = gql`
  query {
    regions {
      uid
      name
    }
  }
`;

const CURRENCIES = gql`
  query {
    currencies {
      uid
      chain_symbol
      name
      symbol
      address
    }
  }
`;

const GET_CONTRACT = gql`
  query {
    getContracts {
      uid
      admin
      address
      type
    }
  }
`;
