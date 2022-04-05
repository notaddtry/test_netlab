import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import EditForm from './components/Form/EditForm'

const FormPage = React.lazy(() => import('./pages/FormPage'))

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/form'
          element={
            <Suspense fallback={<p>loading...</p>}>
              <FormPage />
            </Suspense>
          }
        />
        <Route path='/form/edit' element={<EditForm />} />
      </Routes>
    </>
  )
}

export default App
