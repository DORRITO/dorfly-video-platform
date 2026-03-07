import s from './profileinfo.module.scss'
import DefaultAvatar from '../../../assets/defaultAvatar.jpg'
import Button from '../../UI/Button/Button'
import type { ProfileInfoProps } from '../../../types/profile'
import { formatUploadsUrl } from '../../../utils/formatUploadsUrl'

function ProfileInfoAvatar(props: ProfileInfoProps) {
  return (
    <div className={s.ProfileInfo__Avatar}>
        <div className={s.ProfileInfo__Avatar__containerImage}>
            <img src={props.user?.avatar ? formatUploadsUrl(props.user?.avatar) : DefaultAvatar} alt="" />
        </div>

        <div className={s.ProfileInfo__Avatar__text}>
            {props.user?.nickname}
        </div>

        <div className={s.ProfileInfo__Avatar__button}>
            <Button buttonText="Подписаться" />
        </div>
    </div>
  )
}

export default ProfileInfoAvatar
