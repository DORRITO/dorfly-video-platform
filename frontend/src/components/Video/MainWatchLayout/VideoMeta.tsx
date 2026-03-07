import { HiOutlineHeart, HiOutlineShare } from "react-icons/hi"
import { formatDate } from "../../../utils/formatDate"
import s from "./mainwatchlayout.module.scss"
import type { VideoMetaProps } from "../../../types/components/video"
import useLikeStore from "../../../store/likeStore"
import { useEffect } from "react"

function VideoMeta({ video }: VideoMetaProps) {
  const checkStatusLike = useLikeStore((state) => state.checkStatusLike)
  const isLike = useLikeStore((state) => state.isLike)
  const toggleLike = useLikeStore((state) => state.toggleLike)

  const videoId = video.id

  useEffect(() => {
    checkStatusLike(videoId)
  }, [videoId])

  return (
    <div>
        <div className={s.MainWatchLayout__title}>
            {video.title}
        </div>

        <div className={s.MainWatchLayout__info}>
            <div className={s.MainWatchLayout__left}>
                <span>{video.views_count} Просмотров </span>
                <span>| Дата выхода {formatDate(video.created_at)}</span>
            </div>

            <div className={s.MainWatchLayout__right}>
                <div onClick={() => toggleLike(videoId)} className={`${s.MainWatchLayout__button} ${isLike ? s.MainWatchLayout__active : ''}`}>
                    <HiOutlineHeart /> 
                    <span>{video._count?.likes ?? 0}</span>
                </div>

                <div className={s.MainWatchLayout__button}>
                    <HiOutlineShare />
                    <span>Поделиться</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VideoMeta
