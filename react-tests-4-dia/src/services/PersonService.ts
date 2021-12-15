import { AxiosInstance, AxiosResponse } from 'axios'

import { PersonType, PersonServiceProps } from 'interfaces/Person'

export class PersonService implements PersonServiceProps {
  constructor(private api: AxiosInstance) {}

  findAll = (): Promise<AxiosResponse<PersonType[]>> => this.api.get('/persons')

  create = (name: string): Promise<AxiosResponse<PersonType>> =>
    this.api.post('/persons', { name: name })

  delete = (id: number): Promise<AxiosResponse<void>> =>
    this.api.delete(`/persons/${id}`)
}
