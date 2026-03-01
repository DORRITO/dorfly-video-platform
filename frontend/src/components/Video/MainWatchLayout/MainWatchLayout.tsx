import s from './mainwatchlayout.module.scss'
import VideoPlayer from './VideoPlayer'
import VideoMeta from './VideoMeta'
import CommentSection from './CommentSection/CommentSection'

interface VideoProps {
  video: {
    video_url: string
    title: string
    views_count: number
    created_at: string,
    _count: {
      likes: number
      comments: number
    }
  },
  comments: any[]
}

function MainWatchLayout({ video, comments }: VideoProps) {
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