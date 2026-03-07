import { formatUploadsUrl } from '../../../utils/formatUploadsUrl'
import { formatDuration } from '../../../utils/formatDuration'
import { trimText } from '../../../utils/trimText'
import s from './mediacard.module.scss'
import type { MediaCardProps } from '../../../types/components/ui'

function MediaCard(props: MediaCardProps) {
  return (
    <div onClick={props.onClick} className={s.InfoCard}>
      <div
        style={{
          backgroundImage: `linear-gradient(to top, ${'#00aaff87'} 0%, rgba(5, 8, 16, 0.29) 50%), url(${formatUploadsUrl(props.preview)})`,
        }}
        className={s.MediaCard}
      >
        {typeof props.duration === 'number' && (
          <span className={s.duration}>{formatDuration(props.duration)}</span>
        )}
      </div>

      <div className={s.title}>
        {trimText(props.name, 100)}
      </div>

      {props.creator && (
        <div className={s.videoCard}>
          <div className={s.author}>
            {props.creator.nickname} • {props.viewsCount} Просмотров
          </div>
        </div>
      )}
    </div>
  )
}

export default MediaCard
