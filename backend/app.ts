import express from "express"
import cors from 'cors'
import path from "node:path"
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import authRoutes from './src/routes/auth.route.ts'
import profileRoutes from './src/routes/profile.route.ts'
import categoriesRoutes from './src/routes/categories.route.ts'
import videoRoutes from './src/routes/video.route.ts'
import likeRoutes from './src/routes/like.route.ts'
import followRoutes from './src/routes/follow.route.ts'
import commentRoutes from './src/routes/comment.route.ts'
import prisma from "./src/db/client.ts"
import cookieParser from "cookie-parser"
import 'dotenv/config'
const app = express()

app.use(express.json())
app.use(cookieParser())

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
}

app.use(cors(corsOptions))

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)
app.use('/categories', categoriesRoutes)
app.use('/video', videoRoutes)
app.use('/like', likeRoutes)
app.use('/follow', followRoutes)
app.use('/comment', commentRoutes)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const start = async () => {
  try {
    await prisma.$connect();
    console.log('База данных подключена успешно');

    const server = app.listen(5001, '0.0.0.0', () => {
      console.log('Сервер официально взлетел на порту 5001');
    });

    server.on('error', (error) => {
      console.error('Ошибка сервера:', error);
    });

  } catch (e) {
    console.error('Критическая ошибка при старте:', e);
    process.exit(1);
  }
};

start();