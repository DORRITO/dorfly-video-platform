import s from './input.module.scss'

interface InputProps {
    label?: string,
    placeholder: string,
    type: string,
    icon: any,
    styles?: string
}

function Input(props: InputProps) {
  return (
    <div className={`${s.input} ${props.styles && props.styles}`}>
        {props.label && (
            <label>{props.label}</label>
        )}
        <input type={props.type}  placeholder={props.placeholder} />
        <div className={s.input__inline__button}>
            {props.icon}
        </div>
    </div>
  )
}

export default Input