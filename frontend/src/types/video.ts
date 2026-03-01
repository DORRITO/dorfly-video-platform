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

export type VideoCateogry = {
    id: string,
    name: string,
    preview: string
}

export type VideoSubCategroies = {
    id: string,
    name: string,
    peview: string
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
  creator: Creator,
  category: VideoCateogry,
  subcategory: VideoSubCategroies
}