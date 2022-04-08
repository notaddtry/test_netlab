import React, { useEffect, useState } from 'react'
import {
  Control,
  Controller,
  FieldError,
  UseFormRegister,
} from 'react-hook-form'
import Select from 'react-select'
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
  userValue: 'firstName' | 'email' | 'theme'
  emailRegEx?: RegExp
  mail?: string | null | undefined
  control?: Control<IAuthUser, any>
  defaultValue?: string | number | readonly string[] | undefined

  defaultValueSelect?: { label: string | null; value: string | null }
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
  control,
  defaultValue,
  defaultValueSelect,
}) => {
  const [checkedEmail, setCheckedEmail] = useState<boolean>(false)

  const { onBlur } = useHandleBlur()
  const { onFocus } = useHandleFocus()

  useEffect(() => {
    if (userValue === 'email') {
      setCheckedEmail(emailRegEx!.test(mail!))
    }
  }, [mail])

  return (
    <div
      className={
        userValue === 'email'
          ? errors.email
            ? `form_item input-error`
            : dirtyFields.email && checkedEmail
            ? `form_item input-access`
            : dirtyFields.email
            ? `form_item input-error`
            : `form_item`
          : userValue === 'firstName'
          ? errors.firstName
            ? `form_item input-error`
            : dirtyFields.firstName
            ? `form_item input-access`
            : 'form_item'
          : errors.theme
          ? `form_item input-error`
          : dirtyFields.theme
          ? `form_item input-access`
          : 'form_item'
      }>
      <span className='hide' ref={Ref}>
        Введите Ваше {userValue}
      </span>

      {errors[userValue] && (
        <div className='errorMessage'>
          <span className='errorMessage-span'>Введите {userValue}</span>
        </div>
      )}
      {userValue !== 'theme' ? (
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
                  validate: (value: string | null) =>
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
          defaultValue={defaultValue}
        />
      ) : (
        <Controller
          name='theme'
          control={control}
          render={({ field }) => (
            <Select
              {...register(
                'theme',

                defaultValueSelect?.value === undefined
                  ? {
                      required: true,
                    }
                  : {}
              )}
              placeholder='Тема сообщения'
              isSearchable={false}
              className='react-select-container'
              classNamePrefix='react-select'
              defaultValue={defaultValueSelect}
              {...field}
              options={[
                { value: '1First', label: 'Option 1' },
                { value: '2Second', label: 'Option 2' },
                { value: '3Third', label: 'Option 3' },
              ]}
              onBlur={(e) => {
                onBlur(e, Ref, userValue, setUser, getValues)
              }}
              onFocus={(e) => {
                onFocus(e, Ref, userValue, getValues)
              }}
            />
          )}
        />
      )}
    </div>
  )
}

export default InputForm
