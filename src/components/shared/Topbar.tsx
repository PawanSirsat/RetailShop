import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queries'

const Topbar = () => {
  const navigate = useNavigate()
  const { mutate: signOut, isSuccess } = useSignOutAccount()

  useEffect(() => {
    if (isSuccess) navigate(0)
  }, [isSuccess])

  return (
    <section className='topbar'>
      <div className='flex-between py-4 px-5'>
        <Link
          to='/'
          className='flex gap-3 items-center text-lg font-bold text-yellow-500 hover:text-yellow-700'
        >
          <img
            src='/assets/icons/balajilogo.png'
            alt='logout'
            style={{ width: '25px', height: '25px' }}
          />
          Balaji Traders
        </Link>

        <div className='flex gap-4 '>
          <Button
            variant='ghost'
            className='shad-button_ghost'
            onClick={() => signOut()}
          >
            <p className='font-bold text-slate-500'>Logout</p>

            <img
              src='/assets/icons/logout1.png'
              alt='logout'
              style={{
                width: '25px',
                height: '25px',
                filter: 'brightness(100%) hue-rotate(197deg)',
              }}
            />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Topbar
