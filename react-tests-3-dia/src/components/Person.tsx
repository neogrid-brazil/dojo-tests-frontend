import React, { useCallback, useEffect } from 'react'

import { usePerson } from 'hooks/usePerson'

import PersonList from './PersonList'
import PersonForm from './PersonForm'

const Person: React.FC = () => {
  const {
    persons,
    setPersons,
    findAllPersons,
    createPerson,
    deletePerson,
    loading,
  } = usePerson()

  const fetchPersons = useCallback(() => {
    findAllPersons().then(setPersons)
  }, [findAllPersons, setPersons])

  useEffect(() => {
    fetchPersons()
  }, [findAllPersons, setPersons, fetchPersons])

  return (
    <>
      <PersonForm
        loading={loading}
        createPerson={createPerson}
        fetchPersons={fetchPersons}
      />
      <PersonList
        persons={persons}
        loading={loading}
        fetchPersons={fetchPersons}
        deletePerson={deletePerson}
      />
    </>
  )
}

export default Person
