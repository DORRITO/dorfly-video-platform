import { HiOutlineHeart, HiOutlineShare } from "react-icons/hi"
import { formatDate } from "../../../utils/formatDate"
import s from "./mainwatchlayout.module.scss"
import type { VideoMetaProps } from "../../../types/components/video"

function VideoMeta({ video }: VideoMetaProps) {
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
                <div className={s.MainWatchLayout__button}>
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
