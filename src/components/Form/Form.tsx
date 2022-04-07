import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../store/hooks'
import { addInfo } from '../../store/slices/userSlice'
import { IAuthUser, IUser } from '../types/userType'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import Select from 'react-select'

import '../../index.css'
import { useHandleBlur, useHandleFocus } from '../../hooks/focusHooks'
import InputForm from './InputForm'

// import styles from './form.module.css'

const Form = () => {
  const { onBlur } = useHandleBlur()
  const { onFocus } = useHandleFocus()

  const {
    register,
    formState: { errors, isValid, isDirty, dirtyFields },
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
          {/* <div
            className={
              errors.firstName
                ? `form_item input-error`
                : dirtyFields.firstName
                ? `form_item input-access`
                : 'form_item'
            }>
            <span className='hide' ref={firstNameRef}>
              Введите Ваше имя
            </span>

            {errors.firstName && (
              <div className='errorMessage'>
                <span className='errorMessage-span'>Введите имя</span>
              </div>
            )}
            <input
              {...register('firstName', {
                validate: (value) => value?.trim() !== '' || 'Введите Ваше имя',
              })}
              onBlur={(e) =>
                onBlur(
                  e,
                  firstNameRef,
                  'firstName',
                  setUser,
                  getValues('firstName')
                )
              }
              onFocus={(e) => {
                onFocus(e, firstNameRef, 'firstName', getValues('firstName'))
              }}
              autoComplete='off'
              placeholder='Введите ваше имя'
              type='text'
            />
          </div> */}

          {/* <div
            className={
              errors.email
                ? `form_item input-error`
                : dirtyFields.email && emailRegEx.test(user.email!)
                ? `form_item input-access`
                : dirtyFields.email
                ? `form_item input-error`
                : `form_item`
            }>
            <span className='hide' ref={emailRef}>
              Введите Ваш email
            </span>
            {errors.email && (
              <div className='errorMessage'>
                <span className='errorMessage-span'>Введите e-mail</span>
              </div>
            )}

            <input
              {...register('email', {
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: 'Enter correct email',
                },
                validate: (value) =>
                  value?.trim() !== '' || 'Введите Ваш email',
              })}
              // // setUser((user) => ({ ...user, email: e.target.value }))onInput={
              //   (e: React.FormEvent<HTMLInputElement>) => console.log(e.)

              // }
              onBlur={(e) => {
                onBlur(e, emailRef, 'email', setUser, getValues('email'))
              }}
              onFocus={(e) => {
                onFocus(e, emailRef, 'email', getValues('email'))
              }}
              autoComplete='off'
              type='text'
              placeholder='Введите ваш e-mail'
            />
          </div> */}
          <div
            className={
              errors.theme
                ? `form_item input-error`
                : dirtyFields.theme
                ? `form_item input-access`
                : 'form_item'
            }>
            <span className='hide' ref={themeRef}>
              Выберите тему
            </span>
            {errors.theme && (
              <div className='errorMessage'>
                <span className='errorMessage-span'>Выберите тему</span>
              </div>
            )}
            <Controller
              name='theme'
              control={control}
              render={({ field }) => (
                <Select
                  {...register('theme', { required: true })}
                  placeholder='Тема сообщения'
                  isSearchable={false}
                  className='react-select-container'
                  classNamePrefix='react-select'
                  {...field}
                  options={[
                    { value: '1First', label: 'Option 1' },
                    { value: '2Second', label: 'Option 2' },
                    { value: '3Third', label: 'Option 3' },
                  ]}
                  onBlur={(e) => {
                    onBlur(e, themeRef, 'theme', setUser, getValues('theme'))
                  }}
                  onFocus={(e) => {
                    onFocus(e, themeRef, 'theme', getValues('theme'))
                  }}
                />
              )}
            />
          </div>

          <div className='form_item'>
            <textarea
              {...register('message', { required: false })}
              placeholder='Введите сообщение'></textarea>
          </div>
        </div>

        <div className='btns'>
          <button
            className='btn_reset'
            onClick={(e) => {
              e.preventDefault()
              console.log(errors)
            }}>
            Сбросить
          </button>
          <input
            type='submit'
            className='btn_submit'
            // disabled={!isValid}
          />
        </div>
      </form>
    </div>
  )
}

export default Form
