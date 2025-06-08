

import React, { createContext, useContext, useState } from 'react'

// 1. Create context
const ChatContext = createContext()

// 2. Create provider
export const ChatProvider = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <ChatContext.Provider value={{ open, setOpen }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext)
