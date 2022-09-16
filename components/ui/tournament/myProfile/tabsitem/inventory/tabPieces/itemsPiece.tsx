import React, { useState } from "react";
import s from "../index.module.sass";
import { message } from "antd";
import { ASSEMBLE_INVENTORY_PIECE } from "../../../../../../../hooks/p2e/useP2E";
import ChestPrize from "components/ui/p2e/lucky/prize";
import { ApolloQueryResult, useMutation } from "@apollo/client";
import { InventoryPieceGroup } from "src/generated/graphql_p2e";
import { AppEmitter } from "../../../../../../../services/emitter";
import ButtonWrapper from "../../../../../../common/button/Button";
import { KButton } from "components/ui/common/button";

type Props = {
  item: InventoryPieceGroup;
  refetchMyInventoryPieces: () => Promise<ApolloQueryResult<any>>;
  isOwner?: boolean;
};

const ItemsPiece = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { item, isOwner, refetchMyInventoryPieces } = props;
  const [assembleInventoryPiece] = useMutation(ASSEMBLE_INVENTORY_PIECE, {
    context: {
      endpoint: "p2e",
    },
  });

  const assemble = (type?: string) => {
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
      },
    }).then((r) => setIsLoading(false));
  };

  return (
    <>
      <div className={s.itemPieces}>
        {item &&
          item?.pieces &&
          item?.pieces?.map((itemPrize, indexPrize) => (
            <div className={s.itemPrize} key={`${indexPrize}${itemPrize?.uid}`}>
              <ChestPrize
                //key={prize?.id}
                description={itemPrize?.prize?.desc}
                image={itemPrize?.prize?.img ?? ""}
                title={itemPrize?.prize?.title ?? ""}
                rarity={itemPrize?.prize?.rarity ?? ""}
                amount={itemPrize?.quantity > 0 ? itemPrize?.quantity : 0}
              />
            </div>
          ))}
      </div>
      {isOwner && (
        <div className={s.btnCombine}>
          <KButton
            title="Merge"
            width="120px"
            loading={isLoading}
            disabled={!item.achieved}
            padding="16px 32px"
            onClick={() => assemble(item?.type ?? undefined)}
          />
        </div>
      )}
      {/* {isOwner && (
        <KButton
          title="Merge"
          width="120px"
          loading={isLoading}
          disabled={!item.achieved}
          padding="16px 32px !important"
          onClick={() => assemble(item?.type ?? undefined)}
        />
      )} */}
    </>
  );
};

export default ItemsPiece;
