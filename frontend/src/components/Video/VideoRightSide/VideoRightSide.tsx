import s from './videorightside.module.scss'
import VideoAuthor from './VideoAuthor'
import VideoDescription from './VideoDescription'
import type { VideoRightSideProps } from '../../../types/components/video'

function VideoRightSide({ video }: VideoRightSideProps) {
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
