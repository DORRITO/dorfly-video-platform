import s from './button.module.scss'

interface buttonProps {
    onClick?: any,
    buttonText: any
}

function Button(props: buttonProps) {
  return (
    <button className={s.button}>{props.buttonText}</button>
  )
}

export default Button