import Logo from '../UI/Logo/Logo'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'

import { BsSearch } from "react-icons/bs";
import s from './header.module.scss'

function Header() {
  return (
    <div className={s.header}>
        <div className={s.header__container}>
            <Logo />

            <div className={s.search__input}>
                <Input 
                    type='text'
                    placeholder='Поиск видео..'
                    icon={<BsSearch />}
                    styles={s.header__input}
                />
            </div>

            <Button buttonText="DORRITO" />
        </div>
    </div>
  )
}

export default Header