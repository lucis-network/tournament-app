import s from "./index.module.sass";
// import Link from "next/link"
import AuthStore from "components/Auth/AuthStore";
import router from "next/router";
import LoginBoxStore from "components/Auth/Login/LoginBoxStore";


export default function CreateTournament() {

  const createTournament = () => {
    if (!AuthStore.isLoggedIn) {
      LoginBoxStore.connectModalVisible = true;
    } else {
      router.push("/arena/create");
    }
  };

  return (
    <>
      <div className={`lucis-container-2 ${s.container_create_tournament}`}>
        <div className={s.img} >
          <div />
        </div>
        <div className={s.info}>
          <h1>Create your tournament</h1>
          <p>Everyone can create tournaments on Lucis Network. The most useful platform to create and manage your own tournaments with ease.</p>
          <div className={s.btn}>
            <div onClick={createTournament}>CREATE NOW</div>
          </div>
        </div>
      </div>
    </>
  )
}