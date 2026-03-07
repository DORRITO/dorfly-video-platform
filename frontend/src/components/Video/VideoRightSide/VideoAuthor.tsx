import s from './videorightside.module.scss'
import DefaultAvatar from '../../../assets/defaultAvatar.jpg'
import Button from '../../UI/Button/Button'
import type { VideoAuthorProps } from '../../../types/components/video'
import { formatUploadsUrl } from '../../../utils/formatUploadsUrl'
import { Link } from 'react-router-dom'
import useFollowStore from '../../../store/followStore'
import { useEffect } from 'react'
import useProfileStore from '../../../store/profileStore'

function VideoAuthor({ video }: VideoAuthorProps) {
  const toggleFollow = useFollowStore((state) => state.toggleFollow)
  const checkStatusFollow = useFollowStore((state) => state.checkStatusFollow)
  const isFollowing = useFollowStore((state) => state.isFollowing)
  const getUser = useProfileStore((state) => state.getProfile)
  const user = useProfileStore((state) => state.user)

  const userId = video.creator.id
  const nickname = video.creator.nickname

  useEffect(() => {
    if(!userId) return
    checkStatusFollow(userId)
    getUser(nickname)
  }, [userId])

  return (
    <div className={s.VideoRightSide__author}>
        <div className={s.VideoRightSide__authorLeft}>
            <Link to={`/profile/${video.creator.nickname}`} className={s.VideoRightSide__authorAvatar}>
                <img src={video.creator.avatar ? formatUploadsUrl(video.creator.avatar) : DefaultAvatar} alt="" />
            </Link>

            <div className={s.VideoRightSide__authorInfo}>
                <Link to={`/profile/${video.creator.nickname}`} className={s.nickname}>{video.creator.nickname}</Link>
                <p className={s.followers}>Подписчиков: {user?._count.followers}</p>
            </div>
        </div>

        <Button onClick={() => toggleFollow(userId)} buttonText={isFollowing ? "Отписаться" : "Подписаться"} />
    </div>
  )
}

export default VideoAuthor
