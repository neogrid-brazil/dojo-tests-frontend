import React, { useCallback, useEffect } from 'react'

import { usePerson } from 'hooks/usePerson'
import PersonList from './PersonList'
import PersonForm from './PersonForm'
import { PersonType } from 'interfaces/Person'

const Person: React.FC = () => {
  const {
    loading,
    persons,
    setLoading,
    setPersons,
    findAllPersons,
    createPerson,
    deletePerson,
  } = usePerson()

  const fetchPersons = useCallback(() => {
    return findAllPersons()
      .then((persons: PersonType[]) => {
        setPersons(persons)
      })
  }, [findAllPersons, setPersons])

  useEffect(() => {
    setLoading(true)
    fetchPersons().finally(() => setLoading(false))
  }, [findAllPersons, setPersons, fetchPersons])

  return (
    <>
      <PersonForm
        loading={loading}
        setLoading={setLoading}
        createPerson={createPerson}
        fetchPersons={fetchPersons}
      />
      <PersonList
        persons={persons}
        loading={loading}
        setLoading={setLoading}
        fetchPersons={fetchPersons}
        deletePerson={deletePerson}
      />
    </>
  )
}

export default Person
