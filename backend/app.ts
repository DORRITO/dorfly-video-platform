import express from "express"
import authRoutes from './src/routes/auth.route.ts'
import profileRoutes from './src/routes/profile.route.ts'
import categoriesRoutes from './src/routes/categories.route.ts'
import prisma from "./src/db/client.ts"
import cookieParser from "cookie-parser"
import 'dotenv/config'
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)
app.use('/categories', categoriesRoutes)

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