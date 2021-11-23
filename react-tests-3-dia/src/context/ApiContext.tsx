import React, { useMemo } from 'react'

import axios, { AxiosInstance } from 'axios'

export const ApiContext = React.createContext<AxiosInstance>(null as any)

const ApiContextProvider: React.FC = ({ children }) => {
  const instance = useMemo(() => {
    return axios.create({
      baseURL: 'http://localhost:3001',
    })
  }, [])

  return <ApiContext.Provider value={instance}>{children}</ApiContext.Provider>
}

export default ApiContextProvider
