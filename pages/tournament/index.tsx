import type { NextPage } from "next";
import TournamentDetail from "./[slug]";

/**
 * This has no function in project
 * BUT This is for static site generation
 * To support static generation of: /campaign/index.html
 * Match route: /campaign
 */
const TournamentIndex: NextPage = () => {
  //@ts-ignore
  return <></>;
};

export default TournamentIndex;
