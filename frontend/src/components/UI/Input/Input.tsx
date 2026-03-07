import s from './input.module.scss'
import type { InputProps } from '../../../types/components/ui'

function Input({ label, placeholder, type, icon, styles, value, onChange }: InputProps) {
  return (
    <div className={`${s.input} ${styles ? styles : ''}`}>
      {label && (
        <label>{label}</label>
      )}
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className={s.input__inline__button}>
        {icon}
      </div>
    </div>
  )
}

export default Input
