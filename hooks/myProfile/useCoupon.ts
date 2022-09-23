import { ApolloError, ApolloQueryResult, gql, useQuery } from "@apollo/client";
import { UserInventoryCoupon } from "src/generated/graphql";

type Props = {
  user_id?: number;
  search_name?: string;
  type?: string;
  currency_type?: string;
};
export function useMyCoupon(props: Props): {
  loading: boolean;
  errorMyInventoryCoupon: ApolloError | undefined;
  refetchMyInventoryCoupon: () => Promise<ApolloQueryResult<any>>;
  dataMyInventoryCoupons: UserInventoryCoupon[] | undefined;
} {
  const { loading, error, data, refetch } = useQuery(GET_MY_COUPONS, {
    variables: {
      filter: {
        search: props.search_name,
        type: props.type,
        currency_type: props.currency_type,
      },
    },
    context: {
      endpoint: "p2e",
    },
    fetchPolicy: "network-only",
  });

  return {
    loading,
    errorMyInventoryCoupon: error,
    refetchMyInventoryCoupon: refetch,
    dataMyInventoryCoupons: data?.inventoryCoupons,
  };
}

export const GET_MY_COUPONS = gql`
  query inventoryCoupon($filter: InventoryCouponFilter) {
    inventoryCoupons(filter: $filter) {
      uid
      code
      is_used
      prize {
        img
        title
        desc
        rarity
        coupon {
          uid
          discount
          max_value_off
        }
      }
    }
  }
`;
