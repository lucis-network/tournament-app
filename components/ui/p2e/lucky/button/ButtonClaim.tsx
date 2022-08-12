import s from './ButtonClaim.module.sass'
import { Spin } from "antd";
import {LoadingOutlined} from "@ant-design/icons";

type ButtonClaimProps = {
    isClaimed?: boolean,
    onClick?: () => void,
    disabled: boolean,
    buttonText?: string | null;
    loading?: boolean;
}

const antIcon = <LoadingOutlined style={{ fontSize: 12 }} spin />;

export default function ButtonClaim({isClaimed, onClick, disabled, buttonText, loading}: ButtonClaimProps) {
    return (
        <div className={s.wrapper}>
            <button className={s.btn} disabled={disabled} onClick={onClick}>
              {
                !!buttonText ?
                  <span>
                    {buttonText}
                  </span>
                  :
                  <span>
                    {
                      loading ? <Spin className={s.loadingButton} indicator={antIcon} size="small"/> : null
                    }
                    {isClaimed ? 'Claimed' : 'Claim'}
                  </span>
              }

            </button>
        </div>
    )
}