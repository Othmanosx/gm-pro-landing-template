import { useState, useEffect } from 'react'
import { User } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@root/src/shared/firebase'

// Admin email configuration - change this to your email
const ADMIN_EMAIL = 'othmanosx@gmail.com'

interface ChromeAuthUser {
  email: string
  id: string
  loginTime: number
}

export const useAdminAuth = () => {
  const [firebaseUser, firebaseLoading, firebaseError] = useAuthState(auth)
  const [chromeUser, setChromeUser] = useState<ChromeAuthUser | null>(null)
  const [chromeLoading, setChromeLoading] = useState(true)

  useEffect(() => {
    // Check for Chrome Identity localStorage auth first
    const checkChromeAuth = () => {
      try {
        const stored = localStorage.getItem('adminAuth')
        if (stored) {
          const chromeAuth: ChromeAuthUser = JSON.parse(stored)
          // Check if login is still valid (24 hours)
          if (Date.now() - chromeAuth.loginTime < 24 * 60 * 60 * 1000) {
            setChromeUser(chromeAuth)
            setChromeLoading(false)
            return true
          } else {
            // Expired, clear it
            localStorage.removeItem('adminAuth')
          }
        }
      } catch (error) {
        console.error('Error checking Chrome auth:', error)
        localStorage.removeItem('adminAuth')
      }
      setChromeUser(null)
      setChromeLoading(false)
      return false
    }

    checkChromeAuth()
  }, [])

  // Determine the current user and admin status
  const currentUser = chromeUser ? ({ email: chromeUser.email, uid: chromeUser.id } as User) : firebaseUser

  const isAdmin = currentUser?.email === ADMIN_EMAIL
  const loading = chromeLoading || firebaseLoading

  return {
    user: currentUser,
    loading,
    isAdmin,
    adminEmail: ADMIN_EMAIL,
    error: firebaseError,
  }
}

export default useAdminAuth
