import { multiFormatDateString } from '@/lib/utils'
import { Models } from 'appwrite'

type PostCardProps = {
  post: Models.Document
}

const ProductCard = ({ post }: PostCardProps) => {
  console.log(post)

  return (
    <div className='post-card'>
      <div className='flex items-center gap-3'>
        <img
          src={post.imageUrl || '/assets/icons/product.png'}
          alt='creator'
          className='w-14 h-14 lg:h-14 rounded-full'
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
              {multiFormatDateString(post.updatedDate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
