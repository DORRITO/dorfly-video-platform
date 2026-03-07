export type VideoCounts = {
  likes: number
  comments: number
}

export type Creator = {
  id: string
  nickname: string
  avatar: string | null
  _count: {
    followers: number
  }
}

export type VideoCategory = {
  id: string
  name: string
  preview: string
}

export type VideoSubCategory = {
  id: string
  name: string
  preview: string
}

export type Video = {
  id: string
  title: string
  description: string
  video_url: string
  preview: string
  created_at: string
  views_count: number
  duration_sec: number
  _count?: VideoCounts
  creator: Creator
  category: VideoCategory
  subcategory?: VideoSubCategory | null
}
