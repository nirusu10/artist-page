import { useEffect, useState } from 'react'

type Artwork = {
  id: number
  title: string
  imageUrl: string
  description: string
}

const Gallery = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  useEffect(() => {
    const fetchedArtworks = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Artwork #${i + 1}`,
      imageUrl: `https://picsum.photos/seed/art${i}/3840/2160`,
      description: 'Random image from Lorem Picsum.',
    }))
    setArtworks(fetchedArtworks)
  }, [])

  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex(
          (prevIndex) => (prevIndex - 1 + artworks.length) % artworks.length
        )
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % artworks.length)
      } else if (e.key === 'Escape') {
        setLightboxOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, artworks.length])

  useEffect(() => {
    if (lightboxOpen) {
      window.history.pushState({ lightbox: true }, '')
    }
  }, [lightboxOpen])

  useEffect(() => {
    const onPopState = () => {
      if (lightboxOpen) {
        setLightboxOpen(false)
        window.history.pushState(null, '') // stay on this page
      }
    }

    window.addEventListener('popstate', onPopState)

    return () => {
      window.removeEventListener('popstate', onPopState)
    }
  }, [lightboxOpen])

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + artworks.length) % artworks.length)
  }

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % artworks.length)
  }

  if (!artworks.length) return null

  return (
    <section className='max-w-6xl mx-auto px-4 py-10'>
      <h1 className='text-4xl font-serif font-bold text-center mb-8'>
        Gallery
      </h1>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {artworks.map((art, i) => (
          <div
            key={art.id}
            className='bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer'
            onClick={() => {
              setCurrentIndex(i)
              setLightboxOpen(true)
            }}
          >
            <img
              src={art.imageUrl}
              alt={art.title}
              className='w-full h-60 object-cover'
            />
            <div className='p-4'>
              <h2 className='text-xl font-serif font-semibold mb-2 text-textPrimary'>
                {art.title}
              </h2>
              <p className='text-sm text-gray-600'>{art.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-50'
          onClick={() => setLightboxOpen(false)}
          onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX === null) return

            const touchEndX = e.changedTouches[0].clientX
            const diffX = touchEndX - touchStartX

            const swipeThreshold = 50 // pixels needed to consider swipe

            if (diffX > swipeThreshold) {
              prevImage()
            } else if (diffX < -swipeThreshold) {
              nextImage()
            }

            setTouchStartX(null)
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className='hidden md:block absolute left-3 top-1/2 -translate-y-1/2 text-white text-4xl p-4 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60'
            aria-label='Previous Image'
          >
            ‹
          </button>

          <img
            src={artworks[currentIndex].imageUrl}
            alt={artworks[currentIndex].title}
            className='max-w-full max-h-[80vh] rounded-lg cursor-pointer'
          />

          <button
            onClick={(e) => {
              e.stopPropagation()
              window.open(
                artworks[currentIndex].imageUrl,
                '_blank',
                'noopener,noreferrer'
              )
            }}
            className='mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
          >
            Open Full Image
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className='hidden md:block absolute right-3 top-1/2 -translate-y-1/2 text-white text-4xl p-4 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60'
            aria-label='Next Image'
          >
            ›
          </button>

          <p className='mt-4 text-white font-serif text-xl'>
            {artworks[currentIndex].title}
          </p>
        </div>
      )}
    </section>
  )
}

export default Gallery
