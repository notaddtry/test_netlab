import { useForm, UseFormGetValues } from 'react-hook-form'
import { IAuthUser, IUser } from '../components/types/userType'

export const useHandleBlur = () => {
  const onBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    userRef: React.RefObject<HTMLSpanElement>,
    userValue: 'email' | 'firstName' | 'theme',
    setUser: React.Dispatch<React.SetStateAction<IUser>>,
    getValues: string | null | { label: string | null; value: string | null }
  ) => {
    if (userValue === 'theme') {
      setUser!((user) => ({
        ...user,
        theme: {
          value: e!.target.previousElementSibling!.textContent!.slice(-1),
          label: e!.target.previousElementSibling!.textContent,
        },
      }))
      if (getValues) {
        userRef!.current!.classList.add('inputActive')
        e!.target.previousElementSibling!.classList.add('span-active')
      }
    } else {
      setUser!((user) => ({ ...user, [userValue!]: e!.target.value }))
      if (getValues && e!.target.value)
        userRef!.current!.classList.add('inputActive')
      if (e!.target.value) e!.target.classList.add('span-active')
    }
  }
  return { onBlur }
}

export const useHandleFocus = () => {
  const onFocus = (
    e: React.FocusEvent<HTMLInputElement>,
    userRef: React.RefObject<HTMLSpanElement>,
    userValue: 'email' | 'firstName' | 'theme',
    getValues: string | null | { label: string | null; value: string | null }
  ) => {
    if (userValue === 'theme') {
      if (getValues) userRef.current!.classList.remove('inputActive')
      e.target.previousElementSibling!.classList.remove('span-active')
    } else {
      if (getValues) userRef.current!.classList.remove('inputActive')
      if (e.target.value) e.target.classList.remove('span-active')
    }
  }
  return { onFocus }
}
