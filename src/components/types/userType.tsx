export interface IUser {
  firstName: string | null
  email: string | null
  theme: { label: string | null; value: string | null }
  message?: string | null
}
export interface IAuthUser extends IUser {
  id: string | null
  auth: boolean
}
