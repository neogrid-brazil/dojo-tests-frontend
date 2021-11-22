import { renderHook, act } from '@testing-library/react-hooks'
import { usePerson } from './usePerson'
import { PersonType } from 'interfaces/Person'

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
  const persons: PersonType[] = [
    { id: 1, name: 'Lucas' },
    { id: 2, name: 'Tomkiel' },
  ]

  act(() => {
    result.current.setPersons(persons)
  })

  expect(result.current.persons).toStrictEqual(persons)
})
