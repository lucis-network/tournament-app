import {Form, Input, message, Modal, Image, Spin, Button, Row, Col, Tooltip} from "antd";
import {AuthLMSSGameUser} from "components/Auth/AuthGameStore";
import ButtonWrapper from "components/common/button/Button";
import KYCLmssService from "components/service/p2e/KYCLmssService";
import Link from "next/link";
import React from "react";
import {handleGraphqlErrors} from "utils/apollo_client";
import CountdownTimeBefore from "../raffles/timeBefore";
import s from "./P2EOverview.module.sass";

interface IProps {
  onCancel: () => void;
  onConnectCSGO: () => void;
}

export const ConnectCSGOPopup = (props: IProps) => {

  return (
    <>
      <Modal
        title="Connect CS:GO account"
        visible={true}
        onCancel={() => props.onCancel()}
        wrapClassName="connect-lmss-modal"
        footer={[]}
        centered
        width={500}
        maskClosable={false}
      >
        <div className={s.connectLmssModal}>
          <div className={s.tutorial}>
            <h1>Connect CS:GO account step by step:</h1>
          </div>
          <div>1. Go to <a href="https://www.faceit.com/en" target="_blank">www.faceit.com.</a></div>
          <div>2. Click on the “Register” button, which is located in the upper right.</div>
          <div>3. Register with your personal email or Facebook.</div>
          <div>4. Enter personal data.</div>
          <div>5. Select CS:GO and connect your Steam account.</div>
          <div>6. Sign in Lucis and connect CS:GO Faceit account.</div>
          <div style={{width: "100%", textAlign: "center"}}>
            <button onClick={() => props.onConnectCSGO()} className={s.actionButton} style={{ marginTop: 16,  }}>
              <span>Connect CS:GO</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}