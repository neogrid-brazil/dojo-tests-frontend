import { usePerson } from "../hooks/usePerson";


export const MockReturn: ReturnType<typeof usePerson> = {
  loading: false,
  persons: [],
  setLoading: jest.fn(),
  setPersons: jest.fn(),
  findAllPersons: jest.fn().mockResolvedValue(() => {}),
  createPerson: jest.fn(),
  deletePerson: jest.fn(),
};

export const usePersonMock = (props: Partial<ReturnType<typeof usePerson>>): ReturnType<typeof usePerson>=> {const callback = MockReturn;
  const mockHook = {...callback, ...props};
  (usePerson as jest.Mock).mockReturnValue(mockHook)
  return mockHook;
}
