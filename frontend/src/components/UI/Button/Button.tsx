import s from './button.module.scss'
import type { ButtonProps } from '../../../types/components/ui'

function Button({ onClick, buttonText, styles, type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${s.button} ${styles ? styles : ''}`}
    >
      {buttonText}
    </button>
  )
}

export default Button
