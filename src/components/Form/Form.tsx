import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../store/hooks'
import { addInfo } from '../../store/slices/userSlice'
import { IAuthUser, IUser } from '../types/userType'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import Select from 'react-select'

import '../../index.css'

// import styles from './form.module.css'

const Form = () => {
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
  const firstNameRegEx = /^[A-ЯЁ][а-яё]/g

  const onSubmit: SubmitHandler<IAuthUser> = (data) => {
    const newUser = { ...data, auth: true, id: Date.now().toString() }

    dispatch(addInfo(newUser))
    reset()
    navigate('/')
  }

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    reset()
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    userRef: React.RefObject<HTMLSpanElement>,
    userValue: 'email' | 'firstName'
  ) => {
    setUser((user) => ({ ...user, [userValue]: e.target.value }))
    if (getValues([userValue]) && e.target.value)
      userRef.current!.classList.add('inputActive')
    if (e.target.value) e.target.classList.add('span-active')
  }

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement>,
    userRef: React.RefObject<HTMLSpanElement>,
    userValue: 'email' | 'firstName'
  ) => {
    if (getValues([userValue])) userRef.current!.classList.remove('inputActive')
    if (e.target.value) e.target.classList.remove('span-active')
  }

  const customStyles = {
    option: () => ({
      padding: '14px',
      borderBottom: '1px solid #F4F2F7',
      backgroundColor: 'black',
      boxSizing: 'border-box',
      cursor: 'pointer',
    }),
    control: () => ({
      position: 'relative',
      alignItems: 'center',
      backgroundColor: 'hsl(0, 0%, 100%)',
      border: 'none',
      cursor: 'default',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      minHeight: '38px',
      outline: '0!important',
      transition: 'all 100ms',
      boxSizing: 'border-box',
    }),
    singleValue: () => ({}),
  }

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit(onSubmit)} className='form_wrapper'>
        <div className='form_items'>
          <span className={`title form_item`}>Форма для тебя</span>
          <div
            className={
              dirtyFields.firstName
                ? firstNameRegEx.test(user.firstName!)
                  ? `form_item input-access`
                  : `form_item input-error`
                : 'form_item'
            }>
            <span className='hide' ref={firstNameRef}>
              Введите Ваше имя
            </span>

            <input
              {...register('firstName', {
                validate: (value) => value?.trim() !== '' || 'Введите Ваше имя',
              })}
              onBlur={(e) => handleBlur(e, firstNameRef, 'firstName')}
              onFocus={(e) => {
                handleFocus(e, firstNameRef, 'firstName')
              }}
              autoComplete='off'
              placeholder='Введите ваше имя'
              type='text'
            />
          </div>

          <div
            className={
              dirtyFields.email
                ? emailRegEx.test(user.email!)
                  ? `form_item input-access `
                  : `form_item input-error`
                : 'form_item'
            }>
            <span className='hide' ref={emailRef}>
              Введите Ваш email
            </span>

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
                handleBlur(e, emailRef, 'email')
              }}
              onFocus={(e) => {
                handleFocus(e, emailRef, 'email')
              }}
              autoComplete='off'
              type='text'
              placeholder='Введите ваш e-mail'
            />
          </div>
          <div className='form_item'>
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
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' },
                  ]}
                />
              )}
            />
          </div>
          {/* <div className={`${styles.form_item} ${styles.select}`}>
            <select
              defaultValue='default'
              {...register('theme', {
                validate: (value) => value !== 'default' || 'Choose your theme',
              })}>
              <option value='default' disabled hidden>
                Тема сообщения
              </option>
              <option value='1'>Option 1</option>
              <option value='2'>Option 2</option>
              <option value='3'>Option 3</option>
              Select a theme
            </select>
            {errors?.theme && (
              <span style={{ color: 'red' }}>{errors?.theme?.message}</span>
            )}
          </div> */}

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
              console.log(dirtyFields, emailRegEx)
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
