import React, { useState } from "react";
import { Modal, Image } from "antd";
import s from "./join_tour_success_modal.module.sass";
import { KButton } from "components/ui/common/button";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

export function JoinTourSuccessModal(props: Props) {
  const { isOpen, onClose } = props;

  return (
    <Modal
      centered
      visible={isOpen}
      wrapClassName={s.mdl}
      onCancel={onClose}
      footer={null}
      width="766px"
      closable
    >
      <div className={s.wrapper}>
        <div className={s.title}>
          Congratulations on successfully participating in the tournament!
        </div>
        <Image
          src="/assets/TournamentDetail/img_banner_join_tour_success_modal.png"
          preview={false}
          alt=""
          style={{ width: "100%" }}
        />
        <div className={s.line} />
        <div className={s.guide_text}>
          You can also get more rewards from <span>PLAY CORE</span>:
        </div>
        <div className={s.guide_wrap}>
          <div className={s.bg_image}>
            <Image src="/assets/TournamentDetail/img_lucis_logo.svg" />
          </div>
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src="/assets/TournamentDetail/img_bg_banner_bottom_join_tour_success_modal.png"
              preview={false}
            />
            <div className={s.action}>
              <div className={s.caption}>
                <div>Wishing you great success!</div>
              </div>
              <Link href="/">
                <div className={s.play_now}>
                  <KButton title="PLAY NOW" width="100%" height="100%" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
