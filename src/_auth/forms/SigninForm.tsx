import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '@/components/shared/Loader'
import { useToast } from '@/components/ui/use-toast'

import { SigninValidation } from '@/lib/validation'
import { useSignInAccount } from '@/lib/react-query/queries'
import { useUserContext } from '@/context/AuthContext'
const SigninForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
  const { mutateAsync: signInAccount, isLoading } = useSignInAccount()

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    const session = await signInAccount(user)

    console.log(session)

    if (!session) {
      console.log('Login Failed')

      toast({ title: 'Login failed. Please try again.' })
      return
    }
    const isLoggedIn = await checkAuthUser()
    if (isLoggedIn) {
      form.reset()
      navigate('/')
    } else {
      toast({ title: 'Login failed. Please try again.' })
      return
    }
  }

  const handleDemoLogin = () => {
    const demoCredentials = {
      email: 'rushi@gmail.com',
      password: 'rushi@123',
    }
    handleSignin(demoCredentials)
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 items-center flex-center flex-col py-20'>
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Admin Dashboard</h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>
          Login to admin Dashboard
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className='flex flex-col gap-5 w-full mt-4'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Email</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Password</FormLabel>
                <FormControl>
                  <Input type='password' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='shad-button_primary'>
            {isLoading || isUserLoading ? (
              <div className='flex-center gap-2'>
                <Loader /> Loading...
              </div>
            ) : (
              'Log in'
            )}
          </Button>

          <Button
            type='button'
            className='shad-button_primary2'
            onClick={handleDemoLogin}
          >
            Demo Login
          </Button>

          <p className='text-small-regular text-light-2 text-center mt-2'>
            View Updated Prices
            <Link
              to='/home'
              className='text-yellow-500 text-small-semibold ml-1'
            >
              Products
            </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SigninForm
