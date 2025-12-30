import { IconButton } from '@mui/material'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import ReplyIcon from '@mui/icons-material/Reply'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EditIcon from '@mui/icons-material/Edit'

interface Props {
  isDark: boolean
  onReactionsClick: () => void
  copy: () => void
  onReplyClick: () => void
  onEditMessage: () => void
  sameUser: boolean
  isTranscriptions?: boolean
}

const OptionsPopup = ({
  isDark,
  onReactionsClick,
  copy,
  onReplyClick,
  onEditMessage,
  sameUser,
  isTranscriptions,
}: Props) => {
  if (isTranscriptions)
    return (
      <IconButton onClick={copy} size={'small'} title="Copy message">
        <ContentCopyIcon sx={{ width: 19, height: 19, color: isDark ? '#dadde9' : undefined }} />
      </IconButton>
    )

  return (
    <>
      <IconButton onClick={onReactionsClick} size={'small'} title="Add Emoji Reaction">
        <AddReactionIcon sx={{ width: 19, height: 19, color: isDark ? '#dadde9' : undefined }} />
      </IconButton>
      <IconButton onClick={copy} size={'small'} title="Copy message">
        <ContentCopyIcon sx={{ width: 19, height: 19, color: isDark ? '#dadde9' : undefined }} />
      </IconButton>
      <IconButton onClick={onReplyClick} size={'small'} title="Reply">
        <ReplyIcon sx={{ width: 19, height: 19, color: isDark ? '#dadde9' : undefined }} />
      </IconButton>
      {sameUser && (
        <IconButton onClick={onEditMessage} size={'small'} title="Edit">
          <EditIcon sx={{ width: 19, height: 19, color: isDark ? '#dadde9' : undefined }} />
        </IconButton>
      )}
    </>
  )
}

export default OptionsPopup
