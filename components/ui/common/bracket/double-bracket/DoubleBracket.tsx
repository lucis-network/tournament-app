import {
  Bracket,
  Seed,
  SeedItem,
  SeedTeam,
  RoundProps,
  RenderSeedProps,
} from "react-brackets";
import LosingBracket from "./LosingBracket";
import WiningBracket from "./WiningBracket";
import s from "../index.module.sass";
import GoBracket from "../go-bracket/GoBracket";
import FinalBracket from "./FinalBracket";
import { DatePicker } from "antd";

const DoubleBracket = () => {
  const wining: any[] = [
    // ====== ROUND 1
    {
      title: (
        <>
          <p className="m-0 text text-white">Round 1</p>
          <DatePicker
            showTime
            // onChange={(date, dateString) =>
            //   handleSelectDate(date, dateString, i)
            // }
          />
        </>
      ),
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
      title: (
        <>
          <p className="m-0 text text-white">Round 2</p>
          <DatePicker
            showTime
            // onChange={(date, dateString) =>
            //   handleSelectDate(date, dateString, i)
            // }
          />
        </>
      ),
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
      title: (
        <>
          <p className="m-0 text text-white">Round 3</p>
          <DatePicker
            showTime
            // onChange={(date, dateString) =>
            //   handleSelectDate(date, dateString, i)
            // }
          />
        </>
      ),
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
  const losing: any[] = [
    {
      title: (
        <>
          <p className="m-0 text text-white">Round 1</p>
          <DatePicker
            showTime
            // onChange={(date, dateString) =>
            //   handleSelectDate(date, dateString, i)
            // }
          />
        </>
      ),
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
      title: (
        <>
          <p className="m-0 text text-white">Round 2</p>
          <DatePicker
            showTime
            // onChange={(date, dateString) =>
            //   handleSelectDate(date, dateString, i)
            // }
          />
        </>
      ),
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
      title: (
        <>
          <p className="m-0 text text-white">Round 3</p>
          <DatePicker
            showTime
            // onChange={(date, dateString) =>
            //   handleSelectDate(date, dateString, i)
            // }
          />
        </>
      ),
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
      title: (
        <>
          <p className="m-0 text text-white">Round 4</p>
          <DatePicker
            showTime
            // onChange={(date, dateString) =>
            //   handleSelectDate(date, dateString, i)
            // }
          />
        </>
      ),
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

  const final: any[] = [
    {
      title: (
        <>
          <p className="m-0 text text-white">Final</p>
          <DatePicker
            showTime
            // onChange={(date, dateString) =>
            //   handleSelectDate(date, dateString, i)
            // }
          />
        </>
      ),
      seeds: [
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [
            {
              id: 1,
              name: "The Leons",
              score: (
                <>
                  <input type="text" />
                </>
              ),
            },
            { id: 3, name: "Kitties", score: 6 },
          ],
        },
      ],
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        gap: "20px",
        overflow: "auto",
      }}
    >
      <div>
        <WiningBracket rounds={wining} />
        <LosingBracket rounds={losing} />
      </div>

      <div>
        <FinalBracket rounds={final} />
      </div>
    </div>
  );
};

export default DoubleBracket;
