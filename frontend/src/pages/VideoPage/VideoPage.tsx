import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useVideoStore from '../../store/videoStore'
import WatchLayout from '../../components/Video/WatchLayout/WatchLayout'
import useCommentsStore from '../../store/commentsStore'

function VideoPage() {
  const { videoId } = useParams()
  const getVideoById = useVideoStore((state) => state.getVideoById)
  const video = useVideoStore((state) => state.video)

  const getCommentsFromVideo = useCommentsStore((state) => state.getCommentsFromVideo)
  const comments = useCommentsStore((state) => state.comments)

  useEffect(() => {
    if(!videoId) return

    void getVideoById(videoId)
    void getCommentsFromVideo(videoId)
  }, [videoId, getVideoById, getCommentsFromVideo])

  if(!video) return null

  return (
    <div className='VideoPage'>
        <div className="VideoPage__container">
            <WatchLayout 
              video={video}
              comments={comments}
            />
        </div>
    </div>
  )
}

export default VideoPage
