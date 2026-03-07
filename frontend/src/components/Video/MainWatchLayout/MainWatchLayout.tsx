import s from './mainwatchlayout.module.scss'
import VideoPlayer from './VideoPlayer'
import VideoMeta from './VideoMeta'
import CommentSection from './CommentSection/CommentSection'
import type { MainWatchLayoutProps } from '../../../types/components/video'

function MainWatchLayout({ video, comments }: MainWatchLayoutProps) {
  return (
    <div className={s.MainWatchLayout}>
        <VideoPlayer 
            videoUrl={video.video_url}
        />

        <VideoMeta 
            video={video}
        />

        <CommentSection 
            video={video}
            comments={comments}
        />
    </div>
  )
}

export default MainWatchLayout
