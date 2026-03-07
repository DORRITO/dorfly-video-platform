import type { ChangeEventHandler, MouseEventHandler, ReactNode } from 'react'

export type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  buttonText: ReactNode
  styles?: string
  type?: 'button' | 'submit' | 'reset'
}

export type InputProps = {
  label?: string
  placeholder: string
  type: string
  icon?: ReactNode
  styles?: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export type MediaGridProps<T> = {
  items: T[]
  renderItem: (item: T) => ReactNode
}

type MediaCardCreator = {
  nickname: string
}

export type MediaCardProps = {
  id: string
  name: string
  preview: string
  creator?: MediaCardCreator
  viewsCount?: number
  duration?: number
  onClick?: () => void
}
