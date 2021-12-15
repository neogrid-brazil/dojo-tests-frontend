import { render, waitFor } from '@testing-library/react'

import Person from './Person'
import { usePersonMock } from './__mock__';
jest.mock("hooks/usePerson")

const mockFindAllPersonsWithDelay = () => jest.fn().mockImplementation(() => {
  return new Promise((res, _) => {
    setTimeout(() => res([]), 1)
  })
});


describe('Person', () => {
  it('deve chamar findAllPersons quando componente iniciou.', () => {
    const mock = usePersonMock({
      findAllPersons: jest.fn().mockResolvedValue(() => []),
    });
    render(<Person />)
    expect(mock.findAllPersons).toBeCalled();
  })

  it('deve ter chamado setLoading quando componente iniciou com true.', async () => {
    jest.useFakeTimers();
    const mock = usePersonMock({
      findAllPersons: mockFindAllPersonsWithDelay()
    })
    render(<Person />)
    expect(mock.setLoading).toBeCalled()
    await waitFor(() => expect(mock.setLoading).toHaveBeenCalledWith(true))
  })

  it('deve ter chamado setLoading após carregamento ter finalizado.', async () => {
    jest.useFakeTimers();
    const mock = usePersonMock({
      findAllPersons: mockFindAllPersonsWithDelay()
    })
    render(<Person />)
    jest.advanceTimersByTime(1)
    expect(mock.setLoading).toBeCalled()
    await waitFor(() => expect(mock.setLoading).toHaveBeenCalledWith(false))
  })
})
