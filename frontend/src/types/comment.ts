export type CommentAuthor = {
  nickname: string
  avatar: string | null
}

export type VideoComment = {
  id: string
  text: string
  author: CommentAuthor
}
