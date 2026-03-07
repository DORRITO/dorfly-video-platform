import Logo from '../UI/Logo/Logo'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'

import { BsSearch } from "react-icons/bs"
import s from './header.module.scss'
import useAuthStore from '../../store/authStore'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DropdownHeader from './DropdownHeader'

function Header() {
  const isAuth = useAuthStore((state) => state.isAuth)
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()
  const location = useLocation()

  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  const onClick = () => {
    if (isAuth) {
      setIsOpen((prev) => !prev)
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <div className={s.header}>
      <div className={s.header__container}>
        <Logo />

        <div className={s.search__input}>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type='text'
            placeholder='Поиск видео..'
            icon={<BsSearch />}
            styles={s.header__input}
          />
        </div>

        <div className={s.header__dropdown}>
          <Button
            onClick={onClick}
            buttonText={isAuth ? (user?.nickname ?? 'Профиль') : 'Войти'}
          />

          {isOpen && <DropdownHeader nickname={user?.nickname ?? ''} />}
        </div>
      </div>
    </div>
  )
}

export default Header
