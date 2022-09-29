import React, { useState } from "react";
import { message, Modal, Table, Image, Button } from "antd";
import s from "./join_tour_success_modal.module.sass";
import { KButton } from "components/ui/common/button";

type Props = {
  show: boolean;
  onClose?: (playNow?: boolean) => void;
};

export function JoinTourSuccessModal(props: Props) {
  const { show, onClose } = props;

  const [loadingBtn, setLoadingBtn] = useState(false);

  return (
    <Modal
      centered
      visible={show}
      wrapClassName={s.mdl}
      // okText="Confirm"
      // onCancel={onCancel}
      // onOk={handOk}
      footer={null}
      width="766px"
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
