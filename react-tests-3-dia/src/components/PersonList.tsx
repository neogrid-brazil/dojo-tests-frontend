import React from 'react'

import { PersonType } from 'interfaces/Person'

interface PersonListProps {
  persons: PersonType[]
  loading: boolean
  fetchPersons(): void
  deletePerson(id: number): Promise<void>
}

const PersonList: React.FC<PersonListProps> = ({
  persons,
  deletePerson,
  fetchPersons,
  loading,
}) => {
  const handleDelete = async (id: number) => {
    await deletePerson(id)
    await fetchPersons()
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
              <tr key={index}>
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
