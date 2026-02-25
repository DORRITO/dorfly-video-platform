import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const fileFilename = (req: any, file: Express.Multer.File, cb: any) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
};

const simpleStorage = (folder: string) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `uploads/${folder}`);
    },
    filename: fileFilename
});

const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'video') {
            cb(null, 'uploads/videos');
        } else if (file.fieldname === 'preview') {
            cb(null, 'uploads/previews');
        } else {
            cb(null, 'uploads/misc');
        }
    },
    filename: fileFilename
});

export const uploadVideoData = multer({ 
    storage: videoStorage,
    limits: { fileSize: 1024 * 1024 * 500 },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        
        if (file.fieldname === "video") {
            const allowedVideo = ['.mp4', '.mkv', '.mov', '.avi'];
            if (allowedVideo.includes(ext)) {
                cb(null, true);
            } else {
                cb(new Error('Недопустимый формат видео! Разрешены: mp4, mkv, mov, avi') as any, false);
            }
        } else if (file.fieldname === "preview") {
            const allowedImages = ['.jpg', '.jpeg', '.png', '.webp'];
            if (allowedImages.includes(ext)) {
                cb(null, true);
            } else {
                cb(new Error('Недопустимый формат превью! Разрешены: jpg, png, webp') as any, false);
            }
        } else {
            cb(null, true);
        }
    }
});

export const uploadAvatar = multer({ 
    storage: simpleStorage('avatars'),
    limits: { fileSize: 1024 * 1024 * 2 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['.jpg', '.jpeg', '.png', '.webp'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Недопустимый формат изображения') as any, false);
        }
    }
});

export const uploadCategoryPreview = multer({ 
    storage: simpleStorage('categories'),
    limits: { fileSize: 1024 * 1024 * 5 }
});