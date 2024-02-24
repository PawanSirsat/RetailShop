import { useState } from 'react'
import { Models } from 'appwrite'
import { useGetRecentProducts } from '@/lib/react-query/queries'
import Loader from '@/components/shared/Loader'
import ProductCard from '@/components/shared/ProductCard'

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentProducts()

  if (isErrorPosts) {
    return (
      <div className='flex flex-1'>
        <div className='home-container'>
          <p className='body-medium text-light-1'>Something bad happened</p>
        </div>
        <div className='home-creators'>
          <p className='body-medium text-light-1'>Something bad happened</p>
        </div>
      </div>
    )
  }

  // Filter posts based on the search term
  const filteredPosts = posts?.documents.filter((post) =>
    post.productName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts items-center justify-center'>
          <h2 className='h3-bold md:h2-bold text-center w-full'>
            Product List
          </h2>

          {/* Search input */}
          <input
            type='text'
            placeholder='Search by product name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='border font-bold text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300'
          />

          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className='flex flex-col flex-1 gap-5 w-full'>
              {filteredPosts?.map((post: Models.Document) => (
                <li key={post.$id} className='flex justify-center w-full'>
                  <ProductCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
