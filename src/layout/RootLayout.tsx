import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const RootLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className='max-w-6xl mx-auto p-6'>
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
