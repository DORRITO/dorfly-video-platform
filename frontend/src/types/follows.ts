export type FollowsType = {
    isFollowing: boolean,
    toggleFollow: (followingId: string) => Promise<void>,
    checkStatusFollow: (followingId: string) => Promise<void>
}