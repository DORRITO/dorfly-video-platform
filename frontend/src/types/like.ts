export type LikeType = {
    isLike: boolean,
    toggleLike: (videoId: string) => Promise<void>,
    checkStatusLike: (videoId: string) => Promise<void>
}