import { useCallback, useState } from 'react'
import { useUserContext } from '@/context/AuthContext'
import { multiFormatDateString } from '@/lib/utils'
import { Models } from 'appwrite'
import { Link } from 'react-router-dom'

type PostCardProps = {
  post: Models.Document
}

const ProductCard = ({ post }: PostCardProps) => {
  const isAuthenticated = useUserContext()
  const [imageLoadError, setImageLoadError] = useState<boolean>(false)

  const handleImageError = useCallback(() => {
    setImageLoadError(true)
  }, [])

  return (
    <div className='post-card'>
      <div className='flex items-center gap-3'>
        <img
          src={
            imageLoadError
              ? '/assets/icons/default-image.png'
              : post.imageUrl || '/assets/icons/groc.png'
          }
          alt='creator'
          className='w-14 h-14 lg:h-14 rounded-full'
          onError={handleImageError}
        />
        <div className='flex flex-col flex-grow'>
          <div className='flex justify-between items-center'>
            <p className='base-medium lg:body-bold text-light-1'>
              {post.productName}
            </p>
            <p className='subtle-semibold lg:small-regular'>
              ₹{post.productPrice}
            </p>
          </div>
          <div className='flex items-center gap-2 mt-1'>
            <p className='subtle-semibold lg:small-regular text-light-3'>
              Price updated {multiFormatDateString(post.updatedDate)}
            </p>
            {isAuthenticated.isAuthenticated ? (
              <Link to={`/update-post/${post.$id}`}>
                <img
                  src={'/assets/icons/edit.png'}
                  alt='edit'
                  width={15}
                  height={15}
                  style={{ filter: 'invert(100%)' }}
                />
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
