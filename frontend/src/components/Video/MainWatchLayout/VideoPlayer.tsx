import { formatUploadsUrl } from '../../../utils/formatUploadsUrl'
import s from "./mainwatchlayout.module.scss"
import type { VideoPlayerProps } from '../../../types/components/video'

function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  return (
    <video 
        className={s.MainWatchLayout__video}
        src={formatUploadsUrl(videoUrl)}
        controls
    />
  )
}

export default VideoPlayer
