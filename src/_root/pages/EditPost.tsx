import PostForm from '@/components/form/PostForm'
import Loader from '@/components/shared/Loader'
import { useGetProductById } from '@/lib/react-query/queries'
import { useParams } from 'react-router-dom'

const EditPost = () => {
  const { id } = useParams()
  const { data: post, isLoading } = useGetProductById(id)

  if (isLoading)
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    )

  return (
    <div className='flex flex-1'>
      <div className='home-container mb-20'>
        <div className='max-w-5xl flex items-center justify-center gap-3'>
          <img
            src='/assets/icons/edit.png'
            width={36}
            height={36}
            alt='edit'
            className='invert-white'
          />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Post</h2>
        </div>

        {isLoading ? <Loader /> : <PostForm action='Update' post={post} />}
      </div>
    </div>
  )
}

export default EditPost
