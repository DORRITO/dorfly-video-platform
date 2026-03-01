import s from './videorightside.module.scss'
import VideoAuthor from './VideoAuthor'
import type { Video } from '../../../types/video'
import VideoDescription from './VideoDescription'

interface Props {
    video: Video
}

function VideoRightSide({ video }: Props) {
  console.log(video)

  return (
    <div className={s.VideoRightSide}>
        <VideoAuthor 
            video={video}
        />

        <VideoDescription 
            video={video}
        />
    </div>
  )
}

export default VideoRightSide