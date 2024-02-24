import PostForm from '@/components/form/PostForm'

function AddProduct() {
  return (
    <div className='flex flex-1'>
      <div className='home-container mb-5'>
        <div className='max-w-5xl flex items-center justify-center gap-3'>
          <img src='/assets/icons/box.png' width={36} height={36} alt='add' />
          <h2 className='h3-bold md:h2-bold text-center'>Add Product</h2>
        </div>

        <PostForm action='Create' />
      </div>
    </div>
  )
}

export default AddProduct
