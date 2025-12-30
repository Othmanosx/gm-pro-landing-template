import ChatMsg from './ChatMsg'
import { memo } from 'react'
import RenderIfVisible from 'react-render-if-visible'
import { useMeetMessages } from '@root/src/shared/hooks/useMeetMessages'
import EmptyChat from './EmptyChat'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { useEffect } from 'react'
import { useState } from 'react'

export type Message = {
  key?: string
  text: string
  image?: string
  reactions?: { [key: string]: string[] }
  timestamp: number
  userId?: string
  replyId?: string
  speaker?: string
  isEdited?: boolean
  editedText?: string
  isSuperOnly?: boolean
  isChunked?: boolean
}

const ChatContainer = styled('div')(() => ({
  height: '100%',
  overflowY: 'auto',
  padding: '16px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column-reverse',
}))

const YOU_TRANSLATIONS = ['You', 'أنت', 'Tu', 'Du', 'Sie', 'Vous', 'Tu', 'Você', 'Tú', 'Siz', 'Sen']

const TranscriptionsList = ({ isDark, isWindowed }: { isDark: boolean; isWindowed?: boolean }) => {
  const [windowTranscriptions, setWindowTranscriptions] = useState([])
  const meetTranscriptions = useMeetMessages(state => state.transcriptions)
  const transcriptions = windowTranscriptions.length > 0 ? windowTranscriptions : meetTranscriptions

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.type === 'transcriptions') {
        setWindowTranscriptions(request.data)
      }
    })
  }, [])

  return (
    <ChatContainer id="chat-container" style={{ colorScheme: isDark ? 'dark' : 'light' }}>
      {transcriptions.length === 0 && <EmptyChat isTranscriptions={true} />}
      {transcriptions
        ?.sort((a, b) => b.index - a.index)
        .map((message, i) => {
          if (isWindowed)
            return (
              <RenderIfVisible initialVisible visibleOffset={1800} stayRendered={i < 30}>
                <ChatMsg
                  userId="none"
                  isTranscriptions={true}
                  id={message.index}
                  text={message.text}
                  speaker={message.speaker}
                  profileImage={message.profileImage}
                  side={YOU_TRANSLATIONS.includes(message.speaker) ? 'right' : 'left'}
                  sameUserNext={message.speaker === transcriptions[i - 1]?.speaker}
                  sameUserLast={message.speaker === transcriptions[i + 1]?.speaker}
                  isDark={isDark}
                />
              </RenderIfVisible>
            )

          return (
            <motion.div
              key={message.index + message.speaker}
              layout="position"
              initial={message.isChunked ? null : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{
                duration: 0.2,
              }}
              style={{
                originX: YOU_TRANSLATIONS.includes(message.speaker) ? 1 : 0,
              }}>
              <RenderIfVisible initialVisible visibleOffset={1800} stayRendered={i < 30}>
                <ChatMsg
                  userId="none"
                  isTranscriptions={true}
                  id={message.index}
                  text={message.text}
                  speaker={message.speaker}
                  profileImage={message.profileImage}
                  side={YOU_TRANSLATIONS.includes(message.speaker) ? 'right' : 'left'}
                  sameUserNext={message.speaker === transcriptions[i - 1]?.speaker}
                  sameUserLast={message.speaker === transcriptions[i + 1]?.speaker}
                  isDark={isDark}
                />
              </RenderIfVisible>
            </motion.div>
          )
        })}
    </ChatContainer>
  )
}

export default memo(TranscriptionsList)
