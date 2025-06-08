import { useEffect, useState, useRef } from "react"
// import { useChat } from "./ChatContext"

const ChatPage = () => {
  // const { open, setOpen } = useChat()
  const [message, setMessage] = useState("")
  const [allMessages, setAllMessages] = useState([])
  const [ws, setWs] = useState(null)
  const main = useRef()

  useEffect(() => {
    const token = localStorage.getItem("refresh_token")
    const url = `ws://127.0.0.1:8000/ws/chat/?token=${token}`
    const socket = new WebSocket(url)

    socket.onopen = () => {
      console.log("WebSocket connected")
    }

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data)
      console.log("Incoming:", data)

      setAllMessages((prev) => [
        ...prev,
        {
          text: data.message,
          senderId: data.sender_id,
          username: data.user,
        },
      ])
    }

    setWs(socket)

    return () => {
    //   socket.close()
    }
  }, [])

  useEffect(()=>{
    console.log("This is allmessages", allMessages)
  },[allMessages])

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    ws?.send(JSON.stringify({ message }))
    setMessage("")
  }

  if (!open) return null

  return (
    <div className="fixed right-0 bottom-0 h-[300px] z-40 bg-white border border-gray-200 shadow-2xl rounded-tl-lg overflow-hidden flex flex-col w-80">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <h3 className="font-semibold text-sm">Chat</h3>
        </div>
        <button
          className="hover:bg-blue-700 p-1 rounded-full transition-colors duration-200"
          onClick={handleClose}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 bg-gray-50" ref={main}>
        <div className="flex flex-col gap-2">
          {allMessages.length > 0 ? (
            allMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.senderId == currentUserId ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg shadow-sm text-sm ${
                    msg.senderId == currentUserId
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 text-sm py-8">No messages yet. Start a conversation!</div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-200">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200 flex items-center justify-center min-w-[40px]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatPage
