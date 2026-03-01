import { Link } from 'react-router-dom'
import s from './logo.module.scss'

function Logo() {
  return (
    <Link to="/" className={s.logo}>DOR_FLY</Link>
  )
}

export default Logo