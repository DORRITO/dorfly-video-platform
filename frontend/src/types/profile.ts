export type Profile = {
  id: string
  nickname: string
  avatar: string
  description: string
  created_at: string
  _count: {
    followers: number
  }
}

export type ProfileState = {
  user: Profile | null
  isLoading: boolean
  getProfile: (nickname: string) => Promise<void>
}

export type ProfileInfoProps = {
  user: Profile | null
}
