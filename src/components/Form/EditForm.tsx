import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useForm, SubmitHandler } from 'react-hook-form'
import { editInfo } from '../../store/slices/userSlice'

import { IAuthUser, IUser } from '../types/userType'

import InputForm from './InputForm'

const EditForm: React.FC = () => {
  const { firstName, email, message, theme } = useAppSelector(
    (state) => state.user
  )

  const {
    register,
    formState: { errors, dirtyFields },
    getValues,
    handleSubmit,
    control,
  } = useForm<IAuthUser>({
    defaultValues: {
      firstName,
      email,
      theme,
      message,
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

  const emailRegEx = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<IUser> = (data) => {
    if (data.theme === undefined) data.theme = theme
    const editedUser = { ...data, auth: true, id: Date.now().toString() }

    dispatch(editInfo(editedUser))
    navigate('/')
  }

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit(onSubmit)} className='form_wrapper'>
        <button onClick={() => navigate(-1)}>Back to home</button>
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
              defaultValue={message || ''}
              {...register('message', { required: false })}
              placeholder='Введите сообщение'></textarea>
          </div>
        </div>

        <div className='btns'>
          <input type='submit' className='btn_submit' />
        </div>
      </form>
    </div>
  )
}

export default EditForm
