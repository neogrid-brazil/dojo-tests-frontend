import { useCallback, useContext, useState } from 'react'

import { PersonContext } from 'context/PersonContext'
import { PersonType } from 'interfaces/Person'

export const usePerson = () => {
  const personContext = useContext(PersonContext)

  const [persons, setPersons] = useState<PersonType[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const findAllPersons = useCallback(() => {
    setLoading(true)
    return personContext
      .findAll()
      .then((response) => response.data)
      .finally(() => setLoading(false))
  }, [personContext])

  const createPerson = (name: string) => {
    setLoading(true)
    return personContext
      .create(name)
      .then((response) => response.data)
      .finally(() => setLoading(false))
  }

  const deletePerson = (id: number) => {
    setLoading(true)
    return personContext
      .delete(id)
      .then((response) => response.data)
      .finally(() => setLoading(false))
  }

  return {
    loading,
    persons,
    setPersons,
    findAllPersons,
    createPerson,
    deletePerson,
  }
}
