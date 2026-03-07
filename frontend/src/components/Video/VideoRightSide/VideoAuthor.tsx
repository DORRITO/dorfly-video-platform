import s from './videorightside.module.scss'
import DefaultAvatar from '../../../assets/defaultAvatar.jpg'
import Button from '../../UI/Button/Button'
import type { VideoAuthorProps } from '../../../types/components/video'

function VideoAuthor({ video }: VideoAuthorProps) {
  return (
    <div className={s.VideoRightSide__author}>
        <div className={s.VideoRightSide__authorLeft}>
            <div className={s.VideoRightSide__authorAvatar}>
                <img src={DefaultAvatar} alt="" />
            </div>

            <div className={s.VideoRightSide__authorInfo}>
                <p className={s.nickname}>{video.creator.nickname}</p>
                <p className={s.followers}>Подписчиков: {video.creator._count.followers}</p>
            </div>
        </div>

        <Button buttonText="Подписаться" />
    </div>
  )
}

export default VideoAuthor
