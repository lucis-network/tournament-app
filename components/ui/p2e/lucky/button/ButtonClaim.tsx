import { useState } from 'react'
import s from './ButtonClaim.module.sass'

export default function ButtonClaim() {
    const [iClaim, setIsClaim] = useState(true)
    return (
        <div className={s.wrapper}>
            {
                iClaim ?
                    <button className={s.btn}>Claim</button>
                    :
                    <button className={s.btn_disable}>Claim</button>
            }
        </div>
    )
}