import { Route, Routes } from 'react-router-dom'
import './globals.css'
import SigninForm from './_auth/forms/SigninForm'
import Home from './_auth/forms/Home'
import DashBoard from './_root/pages/DashBoard'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Toaster } from '@/components/ui/toaster'
import SignupForm from './_auth/forms/SignupForm'

function App() {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public route */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SigninForm />} />
          <Route path='/sign-up' element={<SignupForm />} />

          <Route path='/home' element={<Home />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<DashBoard />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  )
}

export default App
