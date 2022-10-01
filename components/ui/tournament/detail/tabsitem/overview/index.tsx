import {BracketGql, TournamentGql } from "src/generated/graphql";
import Banner from "../../banner/Banner";
import s from "./Overview.module.sass";
import {Image} from "antd";
import Link from "next/link";
import ButtonBorder from "../../../../common/button/buttonBorder/ButtonBorder";
import React from "react";
import moment from "moment/moment";

type Props = {
  data: TournamentGql;
  dataBracket: BracketGql;
};
export default function Overview(props: Props) {
  const { data, dataBracket } = props;
  return (
    <div className={s.wrapper}>
      {/*<div dangerouslySetInnerHTML={{ __html: desc ? desc : "" }}></div>*/}
      <Banner
        cover={data?.cover}
        className={s.bannerTourDetailWrap}
        bannerClassName={s.bannerTourDetail}
      />

      <div className={s.info}>
        <div className={s.user}>
          <Link
            href={
              data?.user?.profile?.user_name
                ? `/profile/${data?.user?.profile?.user_name}`
                : "#"
            }
            passHref
          >
            <a
              className={`${s.userInfo} `}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                //src={data?.user?.profile?.avatar ?? '/assets/avatar.jpg'}
                src="/assets/avatar.jpg"
                className={s.userAvatar}
                alt=""
                preview={false}
              />
              <div className={s.userName}>
                <h2>{data?.user?.profile?.display_name}</h2>
                <h3>@{data?.user?.profile?.user_name}</h3>
              </div>
            </a>
          </Link>
        </div>
        <div className={s.registration}>
          <span>0101010101</span>
        </div>
        <div className={s.participants}>
          <h3>Participants</h3>
          <div className={s.groupParticipants}>
            <Image
              src="/assets/TournamentDetail/ic_participant.svg"
              preview={false}
              alt=""
            />
            <span>{data?.cache_tournament?.team_participated ?? 0}/{data?.participants}</span>
          </div>
        </div>
        <div className={s.btnGroup}>
          <ButtonBorder name="btn_join_banner">
            <div className={s.btnJoin}><p>JOIN NOW</p></div>
          </ButtonBorder>
          <ButtonBorder>
            <div className={s.btnJoin}>
              <Image
                src="/assets/TournamentDetail/ic_new_share.svg"
                preview={false}
                alt=""
              />
            </div>
          </ButtonBorder>
        </div>
      </div>

      <div className={s.titleTour}>
        <h1>{data?.name}</h1>
        <div className={s.infoM}>
          <div className={s.userM}>
            <Link
              href={
                data?.user?.profile?.user_name
                  ? `/profile/${data?.user?.profile?.user_name}`
                  : "#"
              }
              passHref
            >
              <a
                className={`${s.userInfo} `}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  //src={data?.user?.profile?.avatar ?? '/assets/avatar.jpg'}
                  src="/assets/avatar.jpg"
                  className={s.userAvatar}
                  alt=""
                  preview={false}
                />
                <div className={s.userName}>
                  <h2>{data?.user?.profile?.display_name}</h2>
                  <h3>@{data?.user?.profile?.user_name}</h3>
                </div>
              </a>
            </Link>
          </div>
          <div className={`${s.time} ${s.timeM}`}>
            <span className={s.timeText}>Start time</span><br/>
            <span className={s.timeBrackets}>{` `}{data && data?.brackets && data?.brackets[0] && moment(data?.brackets[0]?.start_at).format(
              "YYYY/MM/DD HH:mm"
            )}</span>
          </div>
        </div>
      </div>

      <div className={s.desc}>
        <div className={s.topDesc}>
          <div className={s.time}>
            <span className={s.timeText}>Start :{` `}</span>
            <span className={s.timeBrackets}>{` `}{data && data?.brackets && data?.brackets[0] && moment(data?.brackets[0]?.start_at).format(
                "YYYY/MM/DD HH:mm"
            )}</span>
          </div>
          <div className={`${s.btnDesc} ${s.entryDesc}`}>
            <Image
                src="/assets/TournamentDetail/ic_dollar.svg"
                preview={false}
                alt=""
            />{" "}
            <span>Free entry</span>
          </div>
          <div className={`${s.btnDesc} ${s.countryDesc}`}>
            <Image
                src="/assets/TournamentDetail/iconMapMark.svg"
                preview={false}
                alt=""
            />
            <span>{data?.region}</span>
          </div>
          <div className={`${s.btnDesc} ${s.discordDesc}`}>
            <Image
                src="/assets/TournamentDetail/ic_dis.svg"
                alt=""
                preview={false}
            />
            <span>Join our Discord</span>
          </div>
          <div className={`${s.btnDesc} ${s.subDesc}`}>
            <Image
                src="/assets/TournamentDetail/ic_sub.svg"
                preview={false}
                alt=""
            />
            <span>Subscribe (100K)</span>
          </div>
        </div>
        <div className={s.botDesc}>
          <div className={s.gameDesc}>
            <Image
                src={data?.game?.logo ?? ""}
                className={s.gameLogo}
                preview={false}
                alt=""
            />
            <span className={s.botDescContent}>{data?.game?.name}</span>
          </div>
          <div className={s.typeDesc}>
            <span className={s.botDescText}>Bracket type </span>
            <span className={s.botDescContent}>{dataBracket?.type === "SINGLE"
              ? "Single elimination"
              : dataBracket?.type === "DOUBLE"
                ? "Double elimination"
                : ""}</span>
          </div>
          <div className={s.teamSizeDesc}>
            <span className={s.botDescText}>Team size </span>
            <span className={s.botDescContent}>{data?.team_size ?? "-"}v{data?.team_size ?? "-"}</span>
          </div>
          <div className={s.matchDesc}>
            <span className={s.botDescText}>Match </span>
            <span className={s.botDescContent}>BO{data?.turns}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
