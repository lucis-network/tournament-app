// @ts-nocheck
import { ChestDetail, LuckyChestPrize } from "../../../../../../src/generated/graphql_p2e";

export const getChestDetailResponse: ChestDetail = {
  "id": "1",
  "type": "CSGO",
  "tier": "STANDARD",
  "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer",
  "ticket_cost": "70",
  "ticket_cost_type": "LUCIS_POINT",
  "created_at": "2022-07-08T07:38:44.841Z",
  "updated_at": "2022-07-08T07:38:44.841Z",
  "prizes": [
    {
      "id": "1",
      "title": "300 Lucis Points",
      "desc": "300 Lucis Points",
      "img": "https://lucis-tour-01.s3.ap-southeast-1.amazonaws.com/lucky-chest/Lucis+point.png",
      "prize_type": "LUCIS_POINT",
      "prize_amount": "300",
      "quantity_in_stock": 1000,
      "valued_at": null
    },
    {
      "id": "2",
      "title": "1000 Lucis Points",
      "desc": "1000 Lucis Points",
      "img": "https://lucis-tour-01.s3.ap-southeast-1.amazonaws.com/lucky-chest/Lucis+point.png",
      "prize_type": "LUCIS_POINT",
      "prize_amount": "1000",
      "quantity_in_stock": 500,
      "valued_at": null
    },
    {
      "id": "3",
      "title": "1 CSGO Lucky Chest",
      "desc": "1 CSGO Lucky Chest",
      "img": "https://lucis-tour-01.s3.ap-southeast-1.amazonaws.com/lucky-chest/NFTs+Box+Piece.png",
      "prize_type": "CSGO_CHEST_TICKET",
      "prize_amount": "1",
      "quantity_in_stock": 100,
      "valued_at": null
    },
    {
      "id": "4",
      "title": "2 CSGO Lucky Chests",
      "desc": "2 CSGO Lucky Chests",
      "img": "https://lucis-tour-01.s3.ap-southeast-1.amazonaws.com/lucky-chest/NFTs+Box+Piece.png",
      "prize_type": "CSGO_CHEST_TICKET",
      "prize_amount": "2",
      "quantity_in_stock": 100,
      "valued_at": null
    },
    {
      "id": "6",
      "title": "1 knife for CS:GO",
      "desc": "1 knife for CS:GO",
      "img": "https://lucis-tour-01.s3.ap-southeast-1.amazonaws.com/lucky-chest/CSGO+-+Keybox.png",
      "prize_type": "CSGO_KNIFE",
      "prize_amount": "1",
      "quantity_in_stock": 1,
      "valued_at": null
    },
    {
      "id": "7",
      "title": "NFT box piece 1",
      "desc": "NFT box piece 1",
      "img": "https://lucis-tour-01.s3.ap-southeast-1.amazonaws.com/lucky-chest/NFTs+Box+Piece.png",
      "prize_type": "NFT_BOX_PIECE_1",
      "prize_amount": "1",
      "quantity_in_stock": 3800,
      "valued_at": null
    },
    {
      "id": "8",
      "title": "NFT box piece 2",
      "desc": "NFT box piece 2",
      "img": "https://lucis-tour-01.s3.ap-southeast-1.amazonaws.com/lucky-chest/NFTs+Box+Piece.png",
      "prize_type": "NFT_BOX_PIECE_2",
      "prize_amount": "1",
      "quantity_in_stock": 1500,
      "valued_at": null
    },
    {
      "id": "9",
      "title": "NFT box piece 3",
      "desc": "NFT box piece 3",
      "img": "https://lucis-tour-01.s3.ap-southeast-1.amazonaws.com/lucky-chest/NFTs+Box+Piece.png",
      "prize_type": "NFT_BOX_PIECE_3",
      "prize_amount": "1",
      "quantity_in_stock": 992,
      "valued_at": null
    },
    {
      "id": "10",
      "title": "NFT box piece 4",
      "desc": "NFT box piece 4",
      "img": "https://lucis-tour-01.s3.ap-southeast-1.amazonaws.com/lucky-chest/NFTs+Box+Piece.png",
      "prize_type": "NFT_BOX_PIECE_4",
      "prize_amount": "1",
      "quantity_in_stock": 2,
      "valued_at": null
    },
    {
      "id": "15",
      "title": "CS:GO lucky piece 1",
      "desc": "CS:GO lucky piece 1",
      "img": "https://lucis-tour-01.s3.ap-southeast-1.amazonaws.com/lucky-chest/CSGO-Weapon+piece.png",
      "prize_type": "CSGO_KNIFE_OR_GLOVE_PIECE_1",
      "prize_amount": "1",
      "quantity_in_stock": 3800,
      "valued_at": null
    },
    {
      "id": "16",
      "title": "CS:GO lucky piece 2",
      "desc": "CS:GO lucky piece 2",
      "img": "https://lucis-tour-01.s3.ap-southeast-1.amazonaws.com/lucky-chest/CSGO-Weapon+piece.png",
      "prize_type": "CSGO_KNIFE_OR_GLOVE_PIECE_2",
      "prize_amount": "1",
      "quantity_in_stock": 1500,
      "valued_at": null
    },
    {
      "id": "17",
      "title": "CS:GO lucky piece 3",
      "desc": "CS:GO lucky piece 3",
      "img": "https://lucis-tour-01.s3.ap-southeast-1.amazonaws.com/lucky-chest/CSGO-Weapon+piece.png",
      "prize_type": "CSGO_KNIFE_OR_GLOVE_PIECE_3",
      "prize_amount": "1",
      "quantity_in_stock": 1200,
      "valued_at": null
    },
    {
      "id": "18",
      "title": "CS:GO lucky piece 4",
      "desc": "CS:GO lucky piece 4",
      "img": "https://lucis-tour-01.s3.ap-southeast-1.amazonaws.com/lucky-chest/CSGO-Weapon+piece.png",
      "prize_type": "CSGO_KNIFE_OR_GLOVE_PIECE_4",
      "prize_amount": "1",
      "quantity_in_stock": 2,
      "valued_at": null
    }
  ]
}


type OpenChestResponse = {
  prize?: LuckyChestPrize
  user_prize_history_uid?: string,
}
export const openChestResponse: OpenChestResponse = {
  prize: {
    "id": "6",
    "title": "1 knife for CS:GO",
    "desc": "1 knife for CS:GO",
    "img": null,
    "prize_type": "CSGO_KNIFE",
    "prize_amount": "1",
    "quantity_in_stock": 1,
    "valued_at": null
  },
  user_prize_history_uid: "TODO",
}