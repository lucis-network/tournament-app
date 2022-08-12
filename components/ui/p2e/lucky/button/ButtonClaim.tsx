import s from './ButtonClaim.module.sass'

type ButtonClaimProps = {
    isClaimed?: boolean,
    onClick?: () => void,
    disabled: boolean,
    buttonText?: string | null;
}

export default function ButtonClaim({isClaimed, onClick, disabled, buttonText}: ButtonClaimProps) {
    return (
        <div className={s.wrapper}>
            <button className={s.btn} disabled={disabled} onClick={onClick}>
              {
                !!buttonText ?
                  <span>{buttonText}</span>
                  :
                  <span>{isClaimed ? 'Claimed' : 'Claim'}</span>
              }
            </button>
        </div>
    )
}