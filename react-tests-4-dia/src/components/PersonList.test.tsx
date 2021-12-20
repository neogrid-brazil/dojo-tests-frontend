import { fireEvent, render, screen } from '@testing-library/react'
import { PersonType } from 'interfaces/Person'
import PersonList from './PersonList'
import { MockReturn, fetchPersons, usePersonMock } from './__mock__'

const MOCK_PERSON_LIST: PersonType[] = [
    { id: 1, name: 'Usuario 1' }
]

jest.mock("hooks/usePerson")

describe('PersonList', () => {
    it('deve mostrar mensagem informando ausência de registros', () => {
        render(<PersonList 
            persons={[]}
            loading={false}
            setLoading={MockReturn.setLoading}
            fetchPersons={fetchPersons}
            deletePerson={MockReturn.deletePerson} />)
        expect(screen.getByText(/Sem registros/gi)).toBeInTheDocument()
    })

    it('deve mostrar registros em tela conforme lista recebida.', () => {
        render(<PersonList 
            persons={MOCK_PERSON_LIST}
            loading={false}
            setLoading={MockReturn.setLoading}
            fetchPersons={fetchPersons}
            deletePerson={MockReturn.deletePerson} />)
        expect(screen.getAllByRole('row').length - 1).toBe(1)
        expect(screen.getByText(/Usuario 1/g)).toBeInTheDocument()
        expect(screen.getByText(/Deletar/g)).toBeInTheDocument()
    })

    it('deve remover registro e mostrar texto "Sem registros".', () => {
      const mock = usePersonMock({
        persons: [...MOCK_PERSON_LIST],
        deletePerson: jest.fn().mockImplementation((x) => mock.persons.pop())
      })
      const props = {
        persons: mock.persons,
        loading: false,
        setLoading: mock.setLoading,
        fetchPersons: fetchPersons,
        deletePerson: mock.deletePerson
      }
      const { container, rerender } = render(<PersonList {...props} />)

        const button = 
          container
            .querySelector(`[data-id="${mock.persons[0].id}"]`)
            ?.querySelector('button') as HTMLElement

        fireEvent.click(button)
        expect(mock.deletePerson).toBeCalled()

        rerender(<PersonList {...props} />)
        expect(screen.getByText('Sem registros')).toBeInTheDocument()
    })
})
