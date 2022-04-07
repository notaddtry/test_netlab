import React from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import { useHandleBlur, useHandleFocus } from '../../hooks/focusHooks'
import { IAuthUser, IUser } from '../types/userType'

interface InputProps {
  errors: {
    id?: FieldError | undefined
    auth?: FieldError | undefined
    firstName?: FieldError | undefined
    email?: FieldError | undefined
    theme?:
      | {
          label?: FieldError | undefined
          value?: FieldError | undefined
        }
      | undefined
    message?: FieldError | undefined
  }
  dirtyFields: {
    id?: boolean | undefined
    auth?: boolean | undefined
    firstName?: boolean | undefined
    email?: boolean | undefined
    theme?:
      | {
          label?: boolean | undefined
          value?: boolean | undefined
        }
      | undefined
    message?: boolean | undefined
  }
  Ref: React.RefObject<HTMLSpanElement>
  register: UseFormRegister<IAuthUser>
  setUser: React.Dispatch<React.SetStateAction<IUser>>
  getValues: string | null | { label: string | null; value: string | null }
  userValue: 'firstName' | 'email'
  emailRegEx?: RegExp
  mail?: string | null | undefined
}

const InputForm: React.FC<InputProps> = ({
  errors,
  dirtyFields,
  Ref,
  register,
  setUser,
  getValues,
  userValue,
  emailRegEx,
  mail,
}) => {
  if (emailRegEx) {
    console.log(dirtyFields.email && emailRegEx!.test(mail!))
  }

  const { onBlur } = useHandleBlur()
  const { onFocus } = useHandleFocus()
  return (
    <div
      className={
        userValue === 'firstName'
          ? errors.firstName
            ? `form_item input-error`
            : dirtyFields.firstName
            ? `form_item input-access`
            : 'form_item'
          : errors.email
          ? `form_item input-error`
          : dirtyFields.email && emailRegEx!.test(mail!) // TODO THIS
          ? `form_item input-access`
          : dirtyFields.email
          ? `form_item input-error`
          : `form_item`
      }>
      <span className='hide' ref={Ref}>
        Введите Ваше {userValue}
      </span>

      {errors[userValue] && (
        <div className='errorMessage'>
          <span className='errorMessage-span'>Введите {userValue}</span>
        </div>
      )}
      <input
        {...register(
          userValue,
          userValue === 'firstName'
            ? {
                validate: (value: string | null) =>
                  value?.trim() !== '' || 'Введите Ваше имя',
              }
            : {
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: 'Enter correct email',
                },
                validate: (value) =>
                  value?.trim() !== '' || 'Введите Ваш email',
              }
        )}
        onBlur={(e) => onBlur(e, Ref, userValue, setUser, getValues)}
        onFocus={(e) => {
          onFocus(e, Ref, userValue, getValues)
        }}
        autoComplete='off'
        placeholder={`Введите ваше ${userValue}`}
        type='text'
      />
    </div>
  )
}

export default InputForm
