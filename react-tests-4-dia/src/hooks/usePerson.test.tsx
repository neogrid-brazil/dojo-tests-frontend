import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { usePerson } from './usePerson'
import { PersonType } from 'interfaces/Person'

const mockPersons: PersonType[] = [
  { id: 1, name: 'Lucas' },
  { id: 2, name: 'Tomkiel' },
]

const mockUseContext = () => {
  const mockUseContext = jest.fn().mockImplementation(() => {
    return {
      findAll: jest.fn().mockResolvedValue({ data: mockPersons }),
      create: jest.fn().mockResolvedValue({ data: mockPersons[0] }),
      delete: jest.fn().mockResolvedValue({ data: {} })
    }
  })
  React.useContext = mockUseContext;

  return { mockUseContext }
}

it('deve iniciar com os valores corretos', () => {
  const { result } = renderHook(() => usePerson())

  expect(result.current.persons).toEqual([])
  expect(result.current.loading).toBe(false)

  expect(result.current.setPersons).toStrictEqual(expect.any(Function))
  expect(result.current.findAllPersons).toStrictEqual(expect.any(Function))
  expect(result.current.deletePerson).toStrictEqual(expect.any(Function))
  expect(result.current.createPerson).toStrictEqual(expect.any(Function))
})

it('deve preencher a pessoa quando chamado o método "setPersons"', () => {
  const { result } = renderHook(() => usePerson())

  act(() => {
    result.current.setPersons(mockPersons)
  })

  expect(result.current.persons).toStrictEqual(mockPersons)
})

it('deve preencher o loading quando chamado o método "setLoading"', () => {
  const { result } = renderHook(() => usePerson())

  act(() => {
    result.current.setLoading(true)
  })

  expect(result.current.loading).toBe(true)

  act(() => {
    result.current.setLoading(false)
  })

  expect(result.current.loading).toBe(false)
})

it('deve chamar o findAll do contexto personContext quando chamado o método "findAllPersons"', async () => {
  mockUseContext()
  const { result } = renderHook(() => usePerson())

  const persons = await result.current.findAllPersons()

  expect(persons).toStrictEqual(mockPersons)
})

it('deve chamar o create do contexto personContext quando chamado o método "createPerson"', async () => {
  mockUseContext()
  const { result } = renderHook(() => usePerson())

  const person = await result.current.createPerson('Test')

  expect(person).toStrictEqual(mockPersons[0])
})

it('deve chamar o delete do contexto personContext quando chamado o método "deletePerson"', async () => {
  mockUseContext()
  const { result } = renderHook(() => usePerson())

  const person = await result.current.deletePerson(1)

  expect(person).toStrictEqual({})
})
