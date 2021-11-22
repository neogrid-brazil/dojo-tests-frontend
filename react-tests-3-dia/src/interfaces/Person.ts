import { AxiosResponse } from 'axios'

export interface PersonServiceProps {
  findAll(): Promise<AxiosResponse<PersonType[]>>
  create(name: string): Promise<AxiosResponse<PersonType>>
  delete(id: number): Promise<AxiosResponse<void>>
}

export type PersonType = {
  id: number
  name: string
}
