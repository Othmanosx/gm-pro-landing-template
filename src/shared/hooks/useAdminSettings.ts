import { useDocument } from 'react-firebase-hooks/firestore'
import { doc, updateDoc, setDoc } from 'firebase/firestore'
import { firestoreDB } from '@root/src/shared/firebase'
import { AdminSettings } from '@root/src/types/admin'

export const useAdminSettings = () => {
  const [settingsSnapshot, loading, error] = useDocument(doc(firestoreDB, 'featureFlags', 'featureFlagsObject'), {
    snapshotListenOptions: { includeMetadataChanges: false },
  })

  const settings = settingsSnapshot?.data() as AdminSettings

  const updateSettings = async (newSettings: AdminSettings) => {
    try {
      const settingsRef = doc(firestoreDB, 'featureFlags', 'featureFlagsObject')

      if (settingsSnapshot?.exists()) {
        await updateDoc(settingsRef, { ...newSettings })
      } else {
        await setDoc(settingsRef, { ...newSettings })
      }

      console.log('Settings updated successfully')
    } catch (error) {
      console.error('Error updating settings:', error)
      throw error
    }
  }

  return {
    settings,
    updateSettings,
    loading,
    error,
  }
}
