import { useCallback, useContext, useState } from 'react'

import { PersonContext } from 'context/PersonContext'
import { PersonType } from 'interfaces/Person'

export const usePerson = () => {
  const personContext = useContext(PersonContext)

  const [persons, setPersons] = useState<PersonType[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const findAllPersons = useCallback(() => {
    return personContext
      .findAll()
      .then((response) => response.data)
  }, [personContext])

  const createPerson = (name: string) => {
    return personContext
      .create(name)
      .then((response) => response.data)
  }

  const deletePerson = (id: number) => {
    return personContext
      .delete(id)
      .then((response) => response.data)
  }

  return {
    loading,
    persons,
    setPersons,
    setLoading,
    findAllPersons,
    createPerson,
    deletePerson,
  }
}
