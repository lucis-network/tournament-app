import s from './ButtonClaim.module.sass'

type ButtonClaimProps = {
    isClaimed?: boolean,
    onClick?: () => void
}

export default function ButtonClaim({isClaimed, onClick}: ButtonClaimProps) {
    return (
        <div className={s.wrapper}>
            <button className={!isClaimed ? s.btn : s.btn_disable} onClick={onClick}>Claim</button>
        </div>
    )
}