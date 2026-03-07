import { useEffect } from 'react'
import ProfileBanner from '../../components/Profile/ProfileBanner/ProfileBanner'
import ProfileInfo from '../../components/Profile/ProfileInfo/ProfileInfo'
import useProfileStore from '../../store/profileStore'
import { useNavigate, useParams } from 'react-router-dom'
import MediaGrid from '../../components/UI/MediaGrid/MediaGrid'
import useVideoStore from '../../store/videoStore'
import MediaCard from '../../components/UI/MediaCard/MediaCard'
import type { Video } from '../../types/video'

function ProfilePage() {
  const { nickname } = useParams()
  const getProfile = useProfileStore((state) => state.getProfile)
  const user = useProfileStore((state) => state.user)

  const getVideoByNickname = useVideoStore((state) => state.getVideoByNickname)
  const videos = useVideoStore((state) => state.videos)

  const navigate = useNavigate()

  useEffect(() => {
    if (!nickname) {
      return
    }

    void getProfile(nickname)
    void getVideoByNickname(nickname)
  }, [nickname, getProfile, getVideoByNickname])

  if (!nickname) {
    return null
  }

  return (
    <div className='ProfilePage'>
        <div className="ProfilePage__container">
            <ProfileBanner />

            <ProfileInfo
                user={user}
            />

            <MediaGrid 
                items={videos}
                renderItem={(video: Video) => (
                    <MediaCard 
                        id={video.id}
                        name={video.title}
                        preview={video.preview}
                        creator={video.creator}
                        viewsCount={video.views_count}
                        duration={video.duration_sec}
                        onClick={() => navigate(`/video/${video.id}`)}
                    />
                )}
            />
        </div>
    </div>
  )
}

export default ProfilePage
