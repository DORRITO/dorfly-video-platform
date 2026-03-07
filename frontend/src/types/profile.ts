export type Profile = {
  id: string
  nickname: string
  avatar: any
  description: string
  created_at: string
  _count: {
    followers: number
  }
}

export type ProfileState = {
  user: Profile | null
  isLoading: boolean
  getProfile: (nickname: string) => Promise<void>,
  getAuthorizedUser: () => Promise<void>,
  updateProfile: (nickname: string, avatar: any, description: string) => Promise<void>
}

export type ProfileInfoProps = {
  user: Profile | null
}
