import bcrypt from 'bcryptjs'
import type { Request, Response } from 'express'
import { candidateEmail, candidateNickname, createUser } from '../services/auth.services.ts'

export const signUp = async (req: Request, res: Response) => {
    try{
        const { email, nickname, password } = req.body
        
        let user = await candidateEmail(email)
        if(user){
            return res.status(400).json({message: "Такой пользователь уже существует!"})
        }

        user = await candidateNickname(nickname)
        if(user){
            return res.status(400).json({message: "Такой никнейм уже занят!"})
        }

        const hashPassword = await bcrypt.hashSync(password, 10)

        await createUser(email, nickname, hashPassword)

        res.status(200).json({message: "Пользователь успешно создан!"})

    } catch(e){
        res.status(500).json({message: "Error create user"})
        console.log(e)
    }
}