import PublicTopbar from '@/components/shared/PublicTopbar'
import { useUserContext } from '@/context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  const isAuthenticated = useUserContext()
  console.log(isAuthenticated)

  return (
    <div className='w-full md:flex'>
      <PublicTopbar />

      {isAuthenticated.isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <>
          <section className='flex items-center justify-center flex-1'>
            <Outlet />
          </section>
        </>
      )}
    </div>
  )
}

export default AuthLayout
