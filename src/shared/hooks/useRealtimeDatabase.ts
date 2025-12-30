import { useState, useEffect } from 'react'
import { databaseREST } from '@root/src/shared/firebase'

interface UseRealtimeDatabaseResult<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

/**
 * Custom hook to use Firebase Realtime Database via REST API
 * This works around CSP limitations in Chrome extensions
 */
export function useRealtimeDatabase<T = any>(
  path: string,
  options: {
    pollInterval?: number
    enabled?: boolean
  } = {},
): UseRealtimeDatabaseResult<T> {
  const { pollInterval = 5000, enabled = true } = options

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(enabled)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!enabled) {
      setLoading(false)
      return
    }

    let stopListening: (() => void) | null = null
    let mounted = true

    const startListening = async () => {
      try {
        setLoading(true)
        setError(null)

        // Initial fetch
        const initialData = await databaseREST.get(path)
        if (mounted) {
          setData(initialData)
          setLoading(false)
        }

        // Start polling for changes
        stopListening = await databaseREST.listen(
          path,
          newData => {
            if (mounted) {
              setData(newData)
            }
          },
          pollInterval,
        )
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'))
          setLoading(false)
        }
      }
    }

    startListening()

    return () => {
      mounted = false
      if (stopListening) {
        stopListening()
      }
    }
  }, [path, pollInterval, enabled])

  return { data, loading, error }
}

/**
 * Custom hook to use Firebase Realtime Database list via REST API
 * Converts object to array with keys
 */
export function useRealtimeDatabaseList<T = any>(
  path: string,
  options: {
    pollInterval?: number
    enabled?: boolean
    keyField?: string
  } = {},
): UseRealtimeDatabaseResult<T[]> {
  const { keyField = 'key', ...restOptions } = options
  const { data: objectData, loading, error } = useRealtimeDatabase<Record<string, T>>(path, restOptions)

  const [listData, setListData] = useState<T[] | null>(null)

  useEffect(() => {
    if (objectData === null) {
      setListData(null)
      return
    }

    if (objectData === undefined || typeof objectData !== 'object') {
      setListData([])
      return
    }

    // Convert object to array with keys
    const array = Object.entries(objectData).map(([key, value]) => ({
      ...value,
      [keyField]: key,
    })) as T[]

    setListData(array)
  }, [objectData, keyField])

  return { data: listData, loading, error }
}
