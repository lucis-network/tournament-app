import s from './ButtonClaim.module.sass'

type ButtonClaimProps = {
    isClaimed?: boolean,
    onClick?: () => void,
    disabled: boolean,
}

export default function ButtonClaim({isClaimed, onClick, disabled}: ButtonClaimProps) {
    return (
        <div className={s.wrapper}>
            <button className={s.btn} disabled={disabled} onClick={onClick}>
                <span>{isClaimed ? 'Claimed' : 'Claim'}</span>
            </button>
        </div>
    )
}