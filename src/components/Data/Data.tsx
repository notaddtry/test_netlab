import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'

import styles from './data.module.css'

const Data = () => {
  const userData = useAppSelector((state) => state.user)

  const { email, firstName, theme, auth } = userData

  return (
    <>
      {auth ? (
        <div className={styles.wrapper}>
          <div className={styles['info-wrapper']}>
            <div className={styles.info}>
              <span className={styles.title}>Form data:</span>
              <span className={styles.infoItem}>
                <strong>ФИО:</strong>
                {firstName}
              </span>
              <span className={styles.infoItem}>
                <strong>E-mail:</strong>
                {email}
              </span>
              <span className={styles.infoItem}>
                <strong>Тема:</strong>
                {theme.label}
              </span>
            </div>
          </div>
          <Link to='/form/edit' className={styles.btn}>
            Изменить
          </Link>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles['info-wrapper']}>
            <div className={styles.info}>
              <span className={styles.title}>Form data:</span>
              <span className={styles.infoItem}>Форма пока не заполнена.</span>
            </div>
          </div>
          <Link to='/form' className={styles.btn}>
            Заполнить форму
          </Link>
        </div>
      )}
    </>
  )
}

export default Data
