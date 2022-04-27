import React, { useState } from 'react'
import { observer } from "mobx-react-lite";
import { SponsorSlotType } from 'src/store/TournamentStore';
import { Button, Col, Collapse, Input, Row, Space, Switch } from "antd";
import CircleImage from "components/ui/common/images/CircleImage";
import s from "./index.module.sass";

type SponsorItemProps = {
  slot?: SponsorSlotType;
  showName?: boolean;
}


export default observer(
  function SponsorSlot(props: SponsorItemProps) {
    const { slot, showName } = props

    return (
      <div>
        <CircleImage
          src={"/assets/MyProfile/defaultAvatar.png"}
          width={'100px'}
        />
        {showName && <div className={s.sponsorName}>Sponsor name</div>}
      </div>
    )
  }
)
