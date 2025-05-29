import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import RootLayout from './layout/RootLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/gallery', element: <Gallery /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
    ],
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
