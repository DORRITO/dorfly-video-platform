import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const storage = (folder: string) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `uploads/${folder}`);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${uuidv4()}${ext}`);
    }
});

export const uploadVideo = multer({ 
    storage: storage('videos'),
    limits: { fileSize: 1024 * 1024 * 500 }
});

export const uploadAvatar = multer({ 
    storage: storage('avatars'),
    limits: { fileSize: 1024 * 1024 * 2 } 
});

export const uploadCategoryPreview = multer({ 
    storage: storage('categories'),
    limits: { fileSize: 1024 * 1024 * 5 }
});