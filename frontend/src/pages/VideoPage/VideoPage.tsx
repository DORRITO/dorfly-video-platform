import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useVideoStore from '../../store/videoStore'
import WatchLayout from '../../components/Video/WatchLayout/WatchLayout'
import useCommentsStore from '../../store/commentsStore'

function VideoPage() {
  const { videoId } = useParams()
  const getVideoFromId = useVideoStore((state) => state.getVideoFromId)
  const video = useVideoStore((state) => state.video)

  const getCommentsFromVideo = useCommentsStore((state) => state.getCommentsFromVideo)
  const comments = useCommentsStore((state) => state.comments)

  useEffect(() => {
    if(!videoId) return

    getVideoFromId(videoId)
    getCommentsFromVideo(videoId)
  }, [videoId, getVideoFromId, getCommentsFromVideo])

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