function HighlightLinks({ children }: { children: string }) {
  // Escape HTML to prevent XSS attacks
  const escapedMessage = children?.replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // Replace URLs with anchor tags
  const replacedMessage = escapedMessage?.replace(
    /(https?:\/\/[^\s]+)/g,
    (url: string) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`,
  )

  return <span dangerouslySetInnerHTML={{ __html: replacedMessage }} />
}

export default HighlightLinks
