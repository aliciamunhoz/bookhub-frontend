interface MessageProps {
  type: 'success' | 'error'
  text: string
}

export function Message({ type, text }: MessageProps) {
  return <div className={`message message--${type}`}>{text}</div>
}
