import s from './profileinfo.module.scss'
import DefaultAvatar from '../../../assets/defaultAvatar.jpg'
import Button from '../../UI/Button/Button'
import type { ProfileInfoProps } from '../../../types/profile'
import { formatUploadsUrl } from '../../../utils/formatUploadsUrl'
import useFollowStore from '../../../store/followStore'
import { useEffect } from 'react'

function ProfileInfoAvatar(props: ProfileInfoProps) {
  const toggleFollow = useFollowStore((state) => state.toggleFollow)
  const checkStatusFollow = useFollowStore((state) => state.checkStatusFollow)
  const isFollowing = useFollowStore((state) => state.isFollowing)

  const userId = props.user?.id

  useEffect(() => {
    if(!userId) return
    checkStatusFollow(userId)
  }, [userId])

  return (
    <div className={s.ProfileInfo__Avatar}>
        <div className={s.ProfileInfo__Avatar__containerImage}>
            <img src={props.user?.avatar ? formatUploadsUrl(props.user?.avatar) : DefaultAvatar} alt="" />
        </div>

        <div className={s.ProfileInfo__Avatar__text}>
            {props.user?.nickname}
        </div>

        <div className={s.ProfileInfo__Avatar__button}>
            <Button onClick={() => toggleFollow(props.user?.id)} buttonText={isFollowing ? "Отписаться" : "Подписаться"} />
        </div>
    </div>
  )
}

export default ProfileInfoAvatar
