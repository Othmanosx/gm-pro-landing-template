import { useQuery } from '@tanstack/react-query'

function useLocation() {
  return useQuery({
    queryKey: ['location'],
    queryFn: async ({ signal }) => {
      // Check localStorage for cached data first
      try {
        const cached = localStorage.getItem('location-data')
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          const hourAgo = Date.now() - 60 * 60 * 1000 // 1 hour ago
          if (timestamp > hourAgo) {
            return data // Return cached data if less than 1 hour old
          }
        }
      } catch (error) {
        console.warn('Failed to read cached location data:', error)
      }

      // Create a timeout signal that cancels after 2 seconds
      const timeoutController = new AbortController()

      // Set a timeout to abort the request after 2 seconds
      const timeout = setTimeout(() => timeoutController.abort('Request timed out'), 2000)

      // Handle cancellation from the query signal
      if (signal) {
        signal.addEventListener('abort', () => timeoutController.abort(signal.reason))
      }

      try {
        const ipResponse = await fetch('https://ipapi.co/json/', { signal: timeoutController.signal })
        const data = await ipResponse.json()

        // Cache the data in localStorage with timestamp
        try {
          localStorage.setItem(
            'location-data',
            JSON.stringify({
              data,
              timestamp: Date.now(),
            }),
          )
        } catch (error) {
          console.warn('Failed to cache location data:', error)
        }

        return data
      } finally {
        clearTimeout(timeout)
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    gcTime: 1000 * 60 * 60, // 1 hour - keeps data in cache even after component unmount
    staleTime: 1000 * 60 * 60, // 1 hour - prevents refetching if data is fresh
    retry: 0,
    networkMode: 'offlineFirst', // Use cached data when available
    meta: {
      persist: true, // Mark this query for persistence
    },
  })
}

export default useLocation
