import React, { Dispatch, SetStateAction } from 'react'

import { PersonType } from 'interfaces/Person'

interface PersonListProps {
  persons: PersonType[]
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  fetchPersons(): void
  deletePerson(id: number): Promise<void>
}

const PersonList: React.FC<PersonListProps> = ({
                                                 setLoading,
                                                 persons,
                                                 deletePerson,
                                                 fetchPersons,
                                                 loading,
                                               }) => {
  const handleDelete = async (id: number) => {
    setLoading(true)
    await deletePerson(id)
    await fetchPersons()
    setLoading(false)
  }

  const hasPersons = () => persons && persons?.length > 0

  if (loading) {
    return <>Carregando...</>
  }

  if (!hasPersons()) {
    return <h1>Sem registros</h1>
  }

  return (
    <>
      <table>
        <thead>
        <tr>
          <th>Nomes</th>
        </tr>
        </thead>
        <tbody>
        {persons &&
        persons.map((person, index) => (
          <tr key={index} data-id={person.id}>
            <td>{person.name}</td>
            <td>
              <button onClick={() => handleDelete(person.id)}>
                Deletar
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

export default PersonList
