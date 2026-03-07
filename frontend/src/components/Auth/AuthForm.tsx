import { useEffect, useState, type FormEvent } from "react"
import type { AuthFormProps } from "../../types/auth"
import Button from "../UI/Button/Button"
import Input from "../UI/Input/Input"
import s from "./authform.module.scss"
import { Link, useNavigate } from "react-router-dom"
import useAuthStore from "../../store/authStore"
import Loader from "../UI/Loader/Loader"

function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isAuth = useAuthStore((state) => state.isAuth)
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await onSubmit({nickname, email, password})
  }

  useEffect(() => {
    if(isAuth){
      navigate(`/profile/${user?.nickname}`)
    }
  }, [isAuth])

  return (
    <div className={s.AuthForm}>
        <div className={s.AuthForm__title}>
          {type === "signup" ? `Регистрация` : `Авторизация`}
        </div>

        <form onSubmit={handleSubmit}>
            {type === "signup" ? (
              <>
                <Input 
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  styles={s.AuthForm__input} 
                  placeholder="Никнейм" 
                  type="text" 
                />
                <Input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  styles={s.AuthForm__input} 
                  placeholder="Почта" 
                  type="text" 
                />
              </>
            ) : (
              <>
                <Input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  styles={s.AuthForm__input} 
                  placeholder="Почта" 
                  type="text" 
                />
              </>
            )}
            <Input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              styles={s.AuthForm__input} 
              placeholder="Пароль" 
              type="password" 
            />

            <Button 
              type="submit"
              buttonText={type === "signup" ? `Регистрация` : `Войти`}
              styles={s.AuthForm__button} />
        </form>

        <div className={s.AuthForm__switch}>{type === "signup" ? (
          <span>Уже есть аккаунт? <Link to="/login">Войти</Link></span>
        ) : (
          <span>Ещё нету аккаунта? <Link to="/signup">Регистрация</Link></span>
        )}</div>
    </div>
  )
}

export default AuthForm
