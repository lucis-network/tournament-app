import React, {useCallback, useEffect, useState} from "react";
import s from "./index.module.sass";
import {Button, Input, message, Select} from "antd";
import {ASSEMBLE_INVENTORY_PIECE, useGetMyInventoryPieces} from "../../../../../../hooks/p2e/useP2E";
import ChestPrize from "components/ui/p2e/lucky/prize";
import { PieceGroup } from "src/generated/graphql";
import debounce from "lodash/debounce";
import {ApolloQueryResult, useMutation} from "@apollo/client";
import {InventoryPieceGroup, LuckyChestPrize, LuckyChestTier} from "src/generated/graphql_p2e";
import {b64DecodeUnicode} from "../../../../../../utils/String";
import {AppEmitter} from "../../../../../../services/emitter";
import ButtonWrapper from "../../../../../common/button/Button";

type Props = {
  item : InventoryPieceGroup,
  refetchMyInventoryPieces : () => Promise<ApolloQueryResult<any>>,
};

const ItemsPiece = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {item, refetchMyInventoryPieces} = props;
  const [assembleInventoryPiece] = useMutation(ASSEMBLE_INVENTORY_PIECE, {
    context: {
      endpoint: 'p2e'
    }
  })

  const assemble = (type?: PieceGroup) => {
    setIsLoading(true);
    assembleInventoryPiece({
      variables: {
        piece_group: type,
      },
      onCompleted: (data) => {
        AppEmitter.emit("refetchMyInventoryItems");
        refetchMyInventoryPieces();
        message.success("Success!");
      },
      onError: () => {
        message.error("Error. Please try again.");
      }
    }).then(r => setIsLoading(false));
  }

  return (
    <>
      <div className={s.itemPieces}>
        {
          item && item?.pieces &&
          item?.pieces?.map((itemPrize, indexPrize) => (
            <div className={s.itemPrize} key={`${indexPrize}${itemPrize?.uid}`}>
              <ChestPrize
                //key={prize?.id}
                description={itemPrize?.prize?.desc}
                image={itemPrize?.prize?.img ?? ''}
                title={itemPrize?.prize?.title ?? ''}
                rarity={itemPrize?.prize?.rarity ?? ''}
                amount={itemPrize?.quantity ?? 0}
              />
            </div>
          ))
        }
      </div>
      <div className={s.btnCombine}>
        {/*<Button loading={isLoading} onClick={() => assemble(item?.type ?? undefined)}>Combine</Button>*/}
        <ButtonWrapper loading={isLoading} onClick={() => assemble(item?.type ?? undefined)} width={120}>Craft</ButtonWrapper>
      </div>
    </>

  );
};

export default ItemsPiece;
