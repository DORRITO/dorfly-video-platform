import type { Video } from '../video'
import type { VideoComment } from '../comment'

export type VideoAuthorProps = {
  video: Video
}

export type VideoDescriptionProps = {
  video: Video
}

export type VideoRightSideProps = {
  video: Video
}

export type VideoPlayerProps = {
  videoUrl: string
}

export type VideoMetaProps = {
  video: Video
}

export type MainWatchLayoutProps = {
  video: Video
  comments: VideoComment[]
}

export type WatchLayoutProps = {
  video: Video
  comments: VideoComment[]
}

export type CommentHeaderProps = {
  item: VideoComment
}

export type CommentSectionProps = {
  video: Video
  comments: VideoComment[]
}
