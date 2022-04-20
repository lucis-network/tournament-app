import { observer } from "mobx-react-lite";
import { useState } from "react";
import s from "./index.module.sass";
import AuthStore from "../../components/Auth/AuthStore";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { email } = AuthStore;
  console.log(email);

  return (
    <div className={s.bannerProfile}>
      <div className="lucis-container">
        <h1>Profile</h1>
      </div>
    </div>
  );
};

export default observer(Profile);
