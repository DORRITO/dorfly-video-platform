import express from "express"
import authRoutes from './src/routes/auth.routes.ts'
const app = express()

app.use(express.json())

app.use('/auth', authRoutes)

app.listen(5001, () => {
    console.log("Server started in 5001 port")
})