import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'

const Data: React.FC = () => {
  const userData = useAppSelector((state) => state.user)

  const { email, firstName, theme, auth } = userData

  return (
    <>
      {auth ? (
        <div className='info-wrapper'>
          <div className='info'>
            <span className='info-title'>Form data:</span>
            <span className='info-item'>
              <strong>ФИО:</strong>
              {firstName}
            </span>
            <span className='info-item'>
              <strong>E-mail:</strong>
              {email}
            </span>
            <span className='info-item'>
              <strong>Тема:</strong>
              {theme.label}
            </span>
          </div>
          <Link to='/form/edit' className='info-btn'>
            Изменить
          </Link>
        </div>
      ) : (
        <div className='info-wrapper'>
          <div className='info'>
            <span className='info-title'>Form data:</span>
            <span className='info-item'>Форма пока не заполнена.</span>
          </div>
          <Link to='/form' className='info-btn'>
            Заполнить форму
          </Link>
        </div>
      )}
    </>
  )
}

export default Data
