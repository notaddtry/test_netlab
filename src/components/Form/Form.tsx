import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '../../store/hooks'
import { addInfo } from '../../store/slices/userSlice'

import { IAuthUser, IUser } from '../types/userType'

import InputForm from './InputForm'
import { removeClasses } from '../../hooks/focusHooks'

const Form = () => {
  const {
    register,
    formState: { errors, dirtyFields },
    getValues,
    handleSubmit,
    reset,
    control,
  } = useForm<IAuthUser>({
    defaultValues: {
      theme: undefined,
    },
  })

  const [user, setUser] = useState<IUser>({
    email: null,
    firstName: null,
    theme: { label: null, value: null },
    message: null,
  })

  const emailRef = useRef<HTMLSpanElement>(null)
  const firstNameRef = useRef<HTMLSpanElement>(null)
  const themeRef = useRef<HTMLSpanElement>(null)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

  const onSubmit: SubmitHandler<IAuthUser> = (data) => {
    const newUser = {
      ...data,
      auth: true,
      id: Date.now().toString(),
    }
    dispatch(addInfo(newUser))
    reset()
    navigate('/')
  }

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    removeClasses()
    reset()
  }

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit(onSubmit)} className='form_wrapper'>
        <div className='form_items'>
          <span className={`title form_item`}>Форма для тебя</span>
          <InputForm
            errors={errors}
            dirtyFields={dirtyFields}
            Ref={firstNameRef}
            register={register}
            setUser={setUser}
            getValues={getValues('firstName')}
            userValue={'firstName'}
          />
          <InputForm
            errors={errors}
            dirtyFields={dirtyFields}
            Ref={emailRef}
            register={register}
            setUser={setUser}
            getValues={getValues('email')}
            userValue={'email'}
            emailRegEx={emailRegEx}
            mail={user.email}
          />
          <InputForm
            errors={errors}
            dirtyFields={dirtyFields}
            Ref={themeRef}
            register={register}
            setUser={setUser}
            getValues={getValues('theme')}
            userValue={'theme'}
            control={control}
          />

          <div className='form_item'>
            <textarea
              {...register('message', { required: false })}
              placeholder='Введите сообщение'></textarea>
          </div>
        </div>

        <div className='btns'>
          <button className='btn_reset' onClick={(e) => handleReset(e)}>
            Сбросить
          </button>
          <input type='submit' className='btn_submit' />
        </div>
      </form>
    </div>
  )
}

export default Form
