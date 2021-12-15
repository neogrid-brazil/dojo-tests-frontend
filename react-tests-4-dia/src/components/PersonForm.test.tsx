
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PersonForm from './PersonForm'
import { MockReturn, usePersonMock } from './__mock__'

jest.mock("hooks/usePerson")

const createPerson = jest.fn().mockImplementation(() => {
  return new Promise((res, _) => {
    setTimeout(() => {
      res({});
    }, 1)
  })
})

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

  it('deve mostrar "Carregando" ao realizar submit.', async () => {
    jest.useFakeTimers();
    const mock = usePersonMock({
      createPerson: createPerson
    })
    render(<PersonForm
        loading={true}
        setLoading={mock.setLoading}
        fetchPersons={fetchPersons}
        createPerson={mock.createPerson}
    />);
    const input = screen.getByRole('search') as HTMLInputElement
    fireEvent.focus(input)
    userEvent.type(input, 'Teste')
    fireEvent.submit(input)
    const text = await screen.findByText(/Carregando/gi)
    expect(mock.createPerson).toBeCalled()
    expect(mock.createPerson).toHaveBeenCalledWith('Teste')
    expect(fetchPersons).toBeCalled()
    expect(text).toBeInTheDocument()
  });

  it('deve limpar input ao finalizar submit.', async () => {
    jest.useFakeTimers();
    const mock = usePersonMock({
      createPerson: createPerson
    })
    render(<PersonForm
        loading={mock.loading}
        setLoading={mock.setLoading}
        fetchPersons={fetchPersons}
        createPerson={mock.createPerson}
    />);
    const input = screen.getByRole('search') as HTMLInputElement;
    fireEvent.focus(input)
    userEvent.type(input, 'Teste')
    fireEvent.submit(input)
    await waitFor(() => mock.createPerson)
    jest.advanceTimersByTime(1);
    expect(mock.createPerson).toBeCalled();
    expect(input.value).toBe('');
  });
})
