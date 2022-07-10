import s from './ButtonClaim.module.sass'

type ButtonClaimProps = {
    isClaimed?: boolean,
    onClick?: () => void
}

export default function ButtonClaim({isClaimed, onClick}: ButtonClaimProps) {
    return (
        <div className={s.wrapper}>
            <button className={s.btn} disabled={isClaimed} onClick={onClick}>
                <span>Claim</span>
            </button>
        </div>
    )
}