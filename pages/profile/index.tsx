import InfoMyProfile from "components/MyProfile/Info/Info"
import EditProfile from "components/MyProfile/EditProfile/EditProfile"
import ContentTournament from "components/MyProfile/ContentTournament/ContentTournament"

import s from "./profile.module.sass"
import { useState } from "react"

const MyProfile = () => {
  const [isShowEdit, setIsShowEdit] = useState(false)
  
  const handleClick = () => {
    setIsShowEdit(!isShowEdit)
  }
  return (
    <div className={s.wapper_profile}>
      {/* Content */}
      <InfoMyProfile click={handleClick} />

      <div className='lucis-container'>
        {
          isShowEdit ? <EditProfile />: <ContentTournament />
        }
      </div>
    </div>
  )
}
export default MyProfile