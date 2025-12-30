import { Reply } from '@root/src/shared/hooks/useGeneralZustandStore'

type Props = {
  message?: string
  imageUrl?: string
  reply?: Reply
  isElmo?: boolean
}

export const getOldMessage = ({ message = '', imageUrl = '', reply = null, isElmo = false }: Props) => {
  if (isElmo || imageUrl === Elmo) return 'ELMO'
  if (reply) return `"${reply?.text || reply?.image}"\n ^ ${message || ' '}${imageUrl || ''}`
  if (imageUrl && message) return `${message || ''} ${imageUrl || ''}`
  if (imageUrl && !message) return imageUrl
  return message
}

export const Elmo = 'https://ia804501.us.archive.org/19/items/elmo_20231221/elmo.jpg'
