import s from './mainwatchlayout.module.scss'
import VideoPlayer from './VideoPlayer'
import VideoMeta from './VideoMeta'

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

        <div className={s.MainWatchLayout__comments}>
            <div className={s.MainWatchLayout__title}>
                Комментарии ({video._count?.comments ?? 0}):
            </div>

            {comments.map((item, index) => (
                <div className={s.MainWatchLayout__comment}>
                    <div className={s.MainWatchLayout__headerComment}>
                        <div className={s.MainWatchLayout__headerCommentLeft}>
                            <div className={s.MainWatchLayout__headerCommentAvatar}>
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="" />
                            </div>

                            <div className={s.MainWatchLayout__headerCommentNickname}>
                                {item.author.nickname}
                            </div>
                        </div>
                    </div>

                    <div className={s.MainWatchLayout__commentText}>
                        {item.text}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MainWatchLayout