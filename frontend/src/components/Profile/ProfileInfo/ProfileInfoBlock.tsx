import s from "./profileinfo.module.scss"
import type { ProfileInfoBlockProps } from "../../../types/components/profile"

function ProfileInfoBlock(props: ProfileInfoBlockProps) {
  return (
    <div className={s.ProfileInfo__Block}>
        <div className={s.ProfileInfo__Block__title}>
            {props.title}
        </div>

        <div className={s.ProfileInfo__Block__value}>
            {props.value}
        </div>
    </div>
  )
}

export default ProfileInfoBlock
