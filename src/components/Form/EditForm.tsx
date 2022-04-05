import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { editInfo } from '../../store/slices/userSlice'
import { IUser } from '../types/userType'
import { useForm, SubmitHandler } from 'react-hook-form'

const EditForm = () => {
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm<IUser>({
    mode: 'onBlur',
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { firstName, email, message, theme } = useAppSelector(
    (state) => state.user
  )

  const onSubmit: SubmitHandler<IUser> = (data) => {
    const editedUser = { ...data, auth: true, id: Date.now().toString() }

    dispatch(editInfo(editedUser))
    reset()
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button onClick={() => navigate(-1)}>Back to home</button>
      <div className='input-field col s6'>
        <input
          {...register('firstName', {
            minLength: {
              value: 2,
              message: 'Enter your name',
            },
          })}
          placeholder='FirstName'
          id='first_name'
          type='text'
          defaultValue={firstName || ''}
          className='validate'
        />
        {errors?.firstName && (
          <span style={{ color: 'red' }}>{errors.firstName.message}</span>
        )}
      </div>
      <div className='input-field col s6'>
        <input
          {...register('email', {
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: 'Enter correct email',
            },
          })}
          id='last_name'
          type='text'
          defaultValue={email || ''}
          className='validate'
          placeholder='email'
        />
        {errors?.email && (
          <span style={{ color: 'red' }}>{errors?.email?.message}</span>
        )}
      </div>

      {/* <div>
        <select
          defaultValue={theme || 'default'}
          className='browser-default'
          {...register('theme', {
            validate: (value) => value !== 'default' || 'Choose your theme',
          })}>
          <option value='default' disabled>
            Choose your option
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

      <div className='input-field col s12'>
        <textarea
          {...register('message')}
          id='textarea1'
          className='materialize-textarea'
          defaultValue={message || ''}
          placeholder='textArea'
        />
      </div>

      <input type='submit' className='btn' />
    </form>
  )
}

export default EditForm
