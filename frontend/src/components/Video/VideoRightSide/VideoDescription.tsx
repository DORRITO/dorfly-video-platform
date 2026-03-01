import s from './videorightside.module.scss'
import type { Video } from '../../../types/video'

interface Props {
    video: Video
}

function VideoDescription({ video }: Props) {
  return (
    <div className={s.VideoDescription}>
        <div className={s.VideoDescription__title}>О видео:</div>

        <div className={s.VideoDescription__text}>
            {video.description}
        </div>

        <div className={s.VideoDescription__categories}>
            Категории: <a href={`/category/${video.category.id}`}>{video.category.name}</a> {video.subcategory?.name ? `, ${video.subcategory.name}` : ""}
        </div>
    </div>
  )
}

export default VideoDescription