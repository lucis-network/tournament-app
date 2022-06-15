import s from "./Info.module.sass";
import {observer} from "mobx-react-lite";
import {UserGraphql} from "../../../../../src/generated/graphql";
import {ApolloQueryResult} from "@apollo/client";

type InfoMyProfileProps = {
  click?: () => void;
  userInfo: UserGraphql,
  getUserProfileRefetch?: () => Promise<ApolloQueryResult<any>>,
  isOwner?: boolean,
  isShowEdit?: boolean
};

export default observer(function InfoMyProfile({ click, userInfo, getUserProfileRefetch, isOwner, isShowEdit }: InfoMyProfileProps) {
  return (
    <div className={s.container}>
      <div
        className={s.banner}
        style={{ backgroundImage: `url(${userInfo?.profile?.cover || '/profile/banner.png'})` }}
      />
      <div className={`${s.user_information} lucis-container`}>
        <div className={s.user_information_left}>
          <div className={s.avt}>
            <img src={userInfo?.profile?.avatar || '/profile/im_user.png'} alt="" />
          </div>
          <div className={s.information}>
            <p>{userInfo?.profile?.display_name ?? userInfo?.profile?.user_name}</p>
            <p>Username: @{userInfo?.profile?.user_name}</p>
            <button className={s.share_info}>
              <img src="/profile/svg/ic_share.svg" alt="" />
              <span>Share</span>
            </button>
          </div>
        </div>
        <div className={s.user_information_right}>
          {isOwner && <button onClick={click}>{!!isShowEdit ? 'Cancel' : 'Edit Profile'}</button>}
        </div>
      </div>
    </div>
  );
});
