import PostForm from '@/components/form/PostForm'

function AddProduct() {
  return (
    <div className='flex flex-1'>
      <div className='common-container mb-40'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img src='/assets/icons/box.png' width={36} height={36} alt='add' />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Add Product</h2>
        </div>

        <PostForm action='Create' />
      </div>
    </div>
  )
}

export default AddProduct
