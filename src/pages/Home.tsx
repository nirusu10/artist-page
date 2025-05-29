import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <main className='flex flex-col items-center justify-center min-h-[70vh] text-center px-4'>
      <h1 className='text-3xl sm:text-5xl font-serif font-bold mb-4'>
        Timo Matic's Art Portfolio
      </h1>
      <p className='text-m sm:text-lg max-w-prose mb-6'>
        Welcome! Explore a collection of paintings and drawings by Timo Matic,
        an artist inspired by cats, blood and boobies.
      </p>
      <div className='flex gap-4'>
        <Link
          to='/gallery'
          className='bg-black text-white px-6 py-3 rounded-2xl shadow hover:bg-gray-600 transition'
        >
          View Artworks
        </Link>
        <Link
          to='/contact'
          className='border border-primary text-primary px-6 py-3 rounded-2xl shadow hover:bg-gray-100 transition'
        >
          Contact Me
        </Link>
      </div>
    </main>
  )
}

export default Home
