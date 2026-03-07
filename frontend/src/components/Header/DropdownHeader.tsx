import { Link, useNavigate } from "react-router-dom"
import s from "./header.module.scss"
import useAuthStore from "../../store/authStore"
import type { DropdownHeaderProps, HeaderMenuItem } from "../../types/components/header"

const menu: HeaderMenuItem[] = [
  {
    label: "Настройки",
    link: "/profile/settings",
  },
  {
    label: "Загрузить видео",
    link: "/video/upload",
  },
  {
    label: "Информация",
    link: "/info",
  },
]

function DropdownHeader(props: DropdownHeaderProps) {
  const logoutState = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const logout = () => {
    void logoutState()
    navigate('/')
  }

  return (
    <div className={s.header__dropdown__body}>
      <Link className={s.header__dropdown__body__profile} to={`/profile/${props.nickname}`}>
        <span>•</span> Мой профиль
      </Link>
      {menu.map((item) => (
        'link' in item ? (
          <Link key={item.link} to={item.link}>{item.label}</Link>
        ) : (
          <button key={item.label} onClick={item.onClick}>{item.label}</button>
        )
      ))}
      <a onClick={() => void logout()}>
        Выйти
      </a>
    </div>
  )
}

export default DropdownHeader
