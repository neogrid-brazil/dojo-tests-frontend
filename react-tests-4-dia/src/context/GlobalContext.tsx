import React from 'react'

import PersonContextProvider from './PersonContext'
import ApiContextProvider from './ApiContext'

const GlobalContext: React.FC = ({ children }) => {
  return (
    <>
      <ApiContextProvider>
        <PersonContextProvider>{children}</PersonContextProvider>
      </ApiContextProvider>
    </>
  )
}

export default GlobalContext
