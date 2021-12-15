import { render, screen } from '@testing-library/react'

import Person from './Person'

import { usePerson } from "../hooks/usePerson";

jest.mock("hooks/usePerson")

const usePersonMock = (props: any) => {
  const callback = {
    loading: false,
    persons: [],
    setLoading: jest.fn(),
    setPersons: jest.fn(),
    findAllPersons: jest.fn().mockResolvedValue(() => {}),
    createPerson: jest.fn(),
    deletePerson: jest.fn(),
  };
  (usePerson as jest.Mock).mockReturnValue({...callback, ...props})
}

describe('Person', () => {
  it('deve iniciar o componente com ...', () => {
    usePersonMock({
      findAllPersons: jest.fn().mockResolvedValue(() => {}),
    })
    render(<Person />)

    screen.debug()
  })
})
