export const formatDuration = (totalSeconds: number): string => {
    const seconds = Math.floor(totalSeconds)

    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    const paddedSecs = secs.toString().padStart(2, '0')
    const paddedMins = mins.toString().padStart(2, '0')

    if(hrs > 0) {
        return `${hrs}:${paddedMins}:${paddedSecs}`
    }

    return `${paddedMins}:${paddedSecs}`
}