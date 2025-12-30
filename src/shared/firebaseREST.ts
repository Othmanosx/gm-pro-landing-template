/**
 * Firebase Realtime Database REST API client for Chrome Extensions
 * This bypasses CSP limitations by using fetch instead of the Firebase SDK
 */

export class FirebaseRealtimeREST {
  private databaseURL: string
  private projectId: string

  constructor(databaseURL: string, projectId: string) {
    this.databaseURL = databaseURL.replace(/\/$/, '') // Remove trailing slash
    this.projectId = projectId
  }

  /**
   * Get data from a path
   */
  async get(path: string): Promise<any> {
    const url = `${this.databaseURL}/${path.replace(/^\//, '')}.json`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Firebase REST GET error:', error)
      throw error
    }
  }

  /**
   * Set data at a path
   */
  async set(path: string, data: any): Promise<any> {
    const url = `${this.databaseURL}/${path.replace(/^\//, '')}.json`

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Firebase REST SET error:', error)
      throw error
    }
  }

  /**
   * Push data to a path (creates a new child with auto-generated key)
   */
  async push(path: string, data: any): Promise<any> {
    const url = `${this.databaseURL}/${path.replace(/^\//, '')}.json`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Firebase REST PUSH error:', error)
      throw error
    }
  }

  /**
   * Delete data at a path
   */
  async delete(path: string): Promise<any> {
    const url = `${this.databaseURL}/${path.replace(/^\//, '')}.json`

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Firebase REST DELETE error:', error)
      throw error
    }
  }

  /**
   * Listen for changes (polling-based since we can't use WebSockets in extensions)
   */
  async listen(path: string, callback: (data: any) => void, intervalMs: number = 5000): Promise<() => void> {
    let isListening = true
    let lastData: any = null

    const poll = async () => {
      if (!isListening) return

      try {
        const currentData = await this.get(path)

        // Only call callback if data has changed
        if (JSON.stringify(currentData) !== JSON.stringify(lastData)) {
          lastData = currentData
          callback(currentData)
        }
      } catch (error) {
        console.error('Firebase REST polling error:', error)
      }

      if (isListening) {
        setTimeout(poll, intervalMs)
      }
    }

    // Start polling
    poll()

    // Return stop function
    return () => {
      isListening = false
    }
  }
}

// Create instance with config
export const createFirebaseREST = (databaseURL: string, projectId: string) => {
  return new FirebaseRealtimeREST(databaseURL, projectId)
}
