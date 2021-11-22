import React, { createContext, useContext } from 'react'

import { PersonServiceProps } from 'interfaces/Person'
import { PersonService } from 'services/PersonService'
import { ApiContext } from './ApiContext'

export const PersonContext = createContext<PersonServiceProps>(null as any)

const PersonContextProvider: React.FC = ({ children }) => {
  const api = useContext(ApiContext)

  return (
    <PersonContext.Provider value={new PersonService(api)}>
      {children}
    </PersonContext.Provider>
  )
}

export default PersonContextProvider
