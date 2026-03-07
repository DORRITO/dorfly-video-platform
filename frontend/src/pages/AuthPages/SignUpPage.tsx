import AuthForm from '../../components/Auth/AuthForm'
import useAuthStore from '../../store/authStore'
import s from './authpages.module.scss'

function SignUpPage() {
  const signUpUser = useAuthStore((state) => state.signUpUser)

  return (
    <div className={s.AuthPage}>
        <AuthForm 
            type="signup"
            onSubmit={({nickname, email, password}) => signUpUser(nickname, email, password)}
        />
    </div>
  )
}

export default SignUpPage
