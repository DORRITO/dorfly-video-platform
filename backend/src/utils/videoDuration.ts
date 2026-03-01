import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { sendError } from "./apiResponse.ts";

const execFileAsync = promisify(execFile)

export async function getVideoDurationSeconds(filePath:string): Promise<number> {
    const { stdout } = await execFileAsync('ffprobe', [
        '-v', 'error',
        '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1',
        filePath,
    ])

    const seconds = Number(stdout.trim())
    if (!Number.isFinite(seconds)) {
        throw new Error(`Cannot parse duration: "${stdout}"`)
    }
    return seconds
}