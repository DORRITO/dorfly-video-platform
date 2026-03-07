export type AuthFormValues = {
  nickname: string
  email: string
  password: string
}

export type AuthFormProps = {
  type: 'signup' | 'login'
  onSubmit: (values: AuthFormValues) => Promise<void> | void
}
