import { useEffect, useState } from 'react'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import s from './profilesettings.module.scss'
import type { SettingsFormProps } from '../../types/components/settingsForm'
import useProfileStore from '../../store/profileStore'

function SettingsForm (props: SettingsFormProps) {
  const [nickname, setNickname] = useState('')
  const [avatar, setAvatar] = useState<File | null>(null)
  const [description, setDescription] = useState('')
  const updateProfile = useProfileStore((state) => state.updateProfile)

  useEffect(() => {
    if(props.user){
      setNickname(props.user.nickname)
      setDescription(props.user.description)
    }
  }, [props.user])

  const onSubmit = () => {
    updateProfile(nickname, avatar, description)
  }

  return (
    <div className={s.SettingsForm}>
      <div className={s.SettingsForm__title}>
          Настройки профиля
      </div>

      <Input 
        placeholder='Никнейм'
        type='text'
        label='Никнейм'
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <Input 
        label='Аватар'  
        type='file'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if(e.target.files) setAvatar(e.target.files[0])
        }}
      />

      <Input 
        type='text'
        label='Описание профиля'
        placeholder='Описание профиля'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button 
        buttonText="Сохранить"
        styles={s.SettingsForm__button}
        type='submit'
        onClick={onSubmit}
      />
    </div>
  )
}

export default SettingsForm