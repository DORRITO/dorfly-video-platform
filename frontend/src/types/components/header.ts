export type LinkMenuItem = {
  label: string
  link: string
}

export type ActionMenuItem = {
  label: string
  onClick: () => void
}

export type HeaderMenuItem = LinkMenuItem | ActionMenuItem

export type DropdownHeaderProps = {
  nickname: string
}
