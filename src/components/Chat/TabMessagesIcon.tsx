import { Badge } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import { useState } from 'react'
import { useMeetMessages } from '@root/src/shared/hooks/useMeetMessages'
import { useEffect } from 'react'

function TabMessagesIcon({ isTranscriptionsTab }: { isTranscriptionsTab: boolean }) {
  const meetMessages = useMeetMessages(state => state.meetMessages)
  const [localMessages, setLocalMessages] = useState(meetMessages)

  const newMessagesLength = meetMessages.length - localMessages.length

  useEffect(() => {
    !isTranscriptionsTab && setLocalMessages(meetMessages)
  }, [isTranscriptionsTab, meetMessages])

  return (
    <Badge sx={{ mx: 1 }} badgeContent={newMessagesLength} color="error" invisible={newMessagesLength === 0}>
      <ChatIcon />
    </Badge>
  )
}

export default TabMessagesIcon
