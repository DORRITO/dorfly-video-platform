import MainWatchLayout from '../MainWatchLayout/MainWatchLayout'
import s from './watchlayout.module.scss'

interface WatchLayoutProps {
    video: any,
    comments: any[]
}

function WatchLayout({ video, comments }: WatchLayoutProps) {
  return (
    <div className={s.WatchLayout}>
        <MainWatchLayout
            video={video}
            comments={comments}
        />
    </div>
  )
}

export default WatchLayout