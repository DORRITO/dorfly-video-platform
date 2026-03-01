import MainWatchLayout from '../MainWatchLayout/MainWatchLayout'
import VideoRightSide from '../VideoRightSide/VideoRightSide'
import s from './watchlayout.module.scss'
import type { Video } from '../../../types/video'

interface WatchLayoutProps {
    video: Video,
    comments: any[]
}

function WatchLayout({ video, comments }: WatchLayoutProps) {
  console.log(video)

  return (
    <div className={s.WatchLayout}>
        <MainWatchLayout
            video={video}
            comments={comments}
        />

        <VideoRightSide 
          video={video}
        />
    </div>
  )
}

export default WatchLayout