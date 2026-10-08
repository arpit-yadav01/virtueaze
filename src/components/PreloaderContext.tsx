'use client'

import React, { createContext, useContext, useState } from 'react'

interface PreloaderContextType {
  isLoaded: boolean
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

const PreloaderContext = createContext<PreloaderContextType>({
  isLoaded: false,
  setIsLoaded: () => {},
})

export const PreloaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <PreloaderContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </PreloaderContext.Provider>
  )
}

export const usePreloader = () => useContext(PreloaderContext)
