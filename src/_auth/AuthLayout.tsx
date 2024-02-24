import PublicTopbar from '@/components/shared/PublicTopbar'
import Topbar from '@/components/shared/Topbar'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  const isAuthenticated = false

  return (
    <div className='w-full md:flex'>
      <PublicTopbar />

      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <>
          <section className='flex flex-1 justify-center items-center flex-col py-10'>
            <Outlet />
          </section>
        </>
      )}
    </div>
  )
}

export default AuthLayout
