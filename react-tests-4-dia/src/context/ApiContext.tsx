import React, { useMemo } from 'react'

import axios, { AxiosInstance } from 'axios'

export const ApiContext = React.createContext<AxiosInstance>(null as any)

function sleep(ms = 2000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const ApiContextProvider: React.FC = ({ children }) => {
  const instance = useMemo(() => {
    return axios.create({
      baseURL: 'http://localhost:3001',
    })
  }, [])

  instance.interceptors.response.use(async (response) => {
    await sleep()
    return response
  })

  return <ApiContext.Provider value={instance}>{children}</ApiContext.Provider>
}

export default ApiContextProvider
