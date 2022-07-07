import HistoryTable from './history'
import s from './LuckyChest.module.sass'
export default function LuckyChest() {
    return (
        <div className={`${s.wrapper} lucis-container-2`}>
            <div className={s.content_lucky_chest_top}>
                <div className={s.heading}>
                    <div className={s.content_top}>
                        <h1>LUCKY CHEST</h1>
                        <p>Try your luck to receive many attractive valuable gifts!</p>
                    </div>
                    <div>
                        <h3>Your ticket</h3>
                        <div className={`${s.group_btn} ${s.group_btn_pc}`}>
                            <div>Open</div>
                            <div className={s.number_coin}>
                                <div className={s.n}>5.000</div>
                                <img src="/assets/P2E/luckyChest/ic_lucis_coin.png" alt="icon" />
                            </div>
                        </div>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the {"industry's"} standard dummy text ever since the 1500s, when an unknown printer</p>
                    </div>
                </div>
                <div className={s.box}>
                    <img src="/assets/P2E/luckyChest/im_box.png" alt="" />
                    <div className={`${s.group_btn} ${s.group_btn_mobile}`}>
                        <div>Open</div>
                        <div className={s.number_coin}>
                            <div className={s.n}>5.000</div>
                            <img src="/assets/P2E/luckyChest/ic_lucis_coin.png" alt="icon" />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{paddingTop: 40}}>
                <HistoryTable />
            </div>
        </div>
    )
}