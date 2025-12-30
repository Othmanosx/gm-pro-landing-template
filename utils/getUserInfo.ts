export const extractUsername = (email: string) => {
  // Define a regular expression pattern to match the username in the email
  const usernameRegex = /^([a-zA-Z0-9._-]+)@/

  // Use the exec method to extract the username from the email
  const match = usernameRegex.exec(email)

  // Check if a match is found
  if (match && match.length > 1) {
    // Return the captured username
    return match[1]
  } else {
    // Return null if no match is found
    return null
  }
}

export const getUserName = (
  userId: string,
  full = false,
  users?: any[],
  anonymousFullName?: string,
  speaker?: string,
) => {
  if (speaker) return speaker
  if (anonymousFullName) return anonymousFullName
  if (!userId) return 'Anonymous'
  const user = users?.find(user => user?.id === userId)
  const userName = full ? user?.fullName : user?.fullName?.split(' ')?.[0] || extractUsername(user?.email)
  return userName || 'User'
}
export const getUserProfilePhoto = (userId: string, users?: any[]) => {
  if (!userId) return null
  const user = users?.find(user => user?.id === userId)
  const userName = user?.profileImageUrl
  return userName || null
}
