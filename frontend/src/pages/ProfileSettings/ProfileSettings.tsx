import { useEffect } from "react"
import SettingsForm from "../../components/ProfileSettings/SettingsForm"
import useProfileStore from "../../store/profileStore"
import useAuthStore from "../../store/authStore"

function ProfileSettings() {
  const getAuthorizedUser = useProfileStore((state) => state.getAuthorizedUser)
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    getAuthorizedUser()
  }, [])

  return (
    <div className='ProfileSettings'>
        <div className="ProfileSettings__container">
            <SettingsForm
              user={user}
            />
        </div>
    </div>
  )
}

export default ProfileSettings
