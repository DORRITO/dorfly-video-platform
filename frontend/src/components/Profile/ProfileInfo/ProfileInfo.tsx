import s from "./profileinfo.module.scss"
import ProfileInfoAvatar from "./ProfileInfoAvatar"
import ProfileInfoBlock from "./ProfileInfoBlock"
import type { ProfileInfoProps } from "../../../types/profile"
import { formatDate } from "../../../utils/formatDate"

function ProfileInfo(props: ProfileInfoProps) {
  return (
    <div className={s.ProfileInfo}>
        <ProfileInfoBlock 
            title="Дата регистрации"
            value={props.user?.created_at ? formatDate(props.user.created_at) : '—'}
        />

        <ProfileInfoAvatar 
            user={props.user}
        />

        <ProfileInfoBlock 
            title="Подписчиков"
            value={`${props.user?._count.followers ?? 0}`}
        />
    </div>
  )
}

export default ProfileInfo
