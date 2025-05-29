import { NavLink } from 'react-router-dom'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

const Header: React.FC = () => {
  return (
    <header className='bg-white shadow-md sticky top-0 z-50'>
      <nav className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <p className='text-2xl font-bold text-gray-900'>Timo Matic Art</p>
        <ul className='flex gap-0.5'>
          {navItems.map(({ name, path }) => (
            <li key={path} className='p-1.5 hover:bg-gray-200 hover:rounded-s'>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-gray-900 ${
                    isActive ? 'font-semibold underline' : ''
                  }`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
