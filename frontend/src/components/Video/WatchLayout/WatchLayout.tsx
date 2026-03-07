import MainWatchLayout from '../MainWatchLayout/MainWatchLayout'
import VideoRightSide from '../VideoRightSide/VideoRightSide'
import s from './watchlayout.module.scss'
import type { WatchLayoutProps } from '../../../types/components/video'

function WatchLayout({ video, comments }: WatchLayoutProps) {
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
