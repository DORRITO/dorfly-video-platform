import AuthForm from "../../components/Auth/AuthForm"
import useAuthStore from "../../store/authStore"
import s from "./authpages.module.scss"

function LoginPage() {
  const loginUser = useAuthStore((state) => state.loginUser)

  return (
    <div className={s.AuthPage}>
        <AuthForm 
          type="login"
          onSubmit={({ email, password }) => loginUser(email, password)}
        />
    </div>
  )
}

export default LoginPage