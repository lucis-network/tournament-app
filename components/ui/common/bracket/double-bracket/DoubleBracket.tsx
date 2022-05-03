import { RoundProps, Seed } from "react-brackets";
import LosingBracket from "./LosingBracket";
import WiningBracket from "./WiningBracket";
import s from "../index.module.sass";

const DoubleBracket = () => {
  // const double: RoundProps[] = [
  //   { title: "Round 1", branch: "upper", seeds: [{}, {}, {}, {}] },
  //   { title: "Round 2", branch: "upper", seeds: [{}, {}] },
  //   { title: "Round 3", branch: "upper", seeds: [{}] },

  //   { title: "Round 1.1", branch: "lower", seeds: [{}, {}, {}, {}] },
  //   { title: "Round 2.1", branch: "lower", seeds: [{}, {}] },
  //   { title: "Round 3.1", branch: "lower", seeds: [{}] },
  //   { title: "Round 4.1", branch: "lower", seeds: [{}] },
  // ];
  const wining: RoundProps[] = [
    // ====== ROUND 1
    {
      title: "Round 1",
      seeds: [
        {},
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [
            { id: 1, name: "The Leons", score: 2 },
            // { id: 3, name: 'Kitties', score: 6 },
          ],
        },
        {},
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [
            { id: 1, name: "The Leons", score: 2 },
            // { id: 3, name: 'Kitties', score: 6 },
          ],
        },
      ],
    },
    // ===== ROUND 2
    {
      title: "Round 2",
      seeds: [...new Array(2)].fill({
        id: 1,
        date: new Date().toDateString(),
        teams: [
          { id: 1, name: "The Leons", score: 2 },
          { id: 3, name: "Kitties", score: 6 },
        ],
      }),
    },

    {
      title: "Round 3",
      seeds: [...new Array(1)].fill({
        id: 1,
        date: new Date().toDateString(),
        teams: [
          { id: 1, name: "The Leons", score: 2 },
          { id: 3, name: "Kitties", score: 6 },
        ],
      }),
    },
  ];
  const losing: RoundProps[] = [
    {
      title: "Round 1",
      seeds: [
        {},
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [
            { id: 1, name: "The Leons", score: 2 },
            // { id: 3, name: 'Kitties', score: 6 },
          ],
        },
      ],
    },
    {
      title: "Round 2",
      seeds: [
        {},
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [
            { id: 1, name: "The Leons", score: 2 },
            // { id: 3, name: 'Kitties', score: 6 },
          ],
        },
      ],
    },
    {
      title: "Round 3",
      seeds: [
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [
            { id: 1, name: "The Leons", score: 2 },
            // { id: 3, name: 'Kitties', score: 6 },
          ],
        },
      ],
    },
    {
      title: "Round 4",
      seeds: [
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [
            { id: 10, name: "WIN 1", score: 2 },
            { id: 12, name: "WIN 2", score: 6 },
          ],
        },
      ],
    },
  ];

  return (
    <div style={{ position: "relative" }}>
      <WiningBracket rounds={wining} />
      <LosingBracket rounds={losing} />
    </div>
  );
};

export default DoubleBracket;
