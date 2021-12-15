
import { render, screen, fireEvent, act } from '@testing-library/react'
import PersonForm from './PersonForm'
import { MockReturn, usePersonMock } from './__mock__';
jest.mock("hooks/usePerson")

const fetchPersons = jest.fn().mockResolvedValue({}) as () => void;
describe('PersonForm', () => {
  it('deve mostrar input', () => {
    render(<PersonForm
        loading={MockReturn.loading}
        setLoading={MockReturn.setLoading}
        fetchPersons={fetchPersons}
        createPerson={MockReturn.createPerson}
    />);
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  fit('deve mostrar "Carregando" ao realizar submit.', () => {
    jest.useFakeTimers();
    usePersonMock({
      createPerson: jest.fn().mockImplementation(() => {
        return new Promise((res, _) => {
          setTimeout(() => res({}), 1)
        })
      })
    })
    render(<PersonForm
        loading={MockReturn.loading}
        setLoading={MockReturn.setLoading}
        fetchPersons={fetchPersons}
        createPerson={MockReturn.createPerson}
    />);
    act(() => {
      
      const input = screen.getByRole('search');
      fireEvent.change(input, { target: {value: 'teste' }});
      fireEvent.submit(input)
    });
    expect(screen.getByText(/Carregando/gi)).toBeInTheDocument();
  });
})
