import { PersonService } from './PersonService'

class ApiMock {
  get = () => jest.fn()
  post = () => jest.fn()
  delete = () => jest.fn()
}

describe('PersonService', () => {
  let service: any
  let api: any

  beforeEach(() => {
    api = new ApiMock()
    service = new PersonService(api)
  })

  it('deve chamar o metodo get quando buscar todas pessoas', () => {
    jest.spyOn(service.api, 'get')
    service.findAll()

    expect(service.api.get).toHaveBeenCalledWith('/persons')
    expect(service.api.get).toHaveBeenCalledTimes(1)
  })

  it('deve chamar o metodo post quando criar uma pessoa', () => {
    jest.spyOn(service.api, 'post')
    service.create('test')

    expect(service.api.post).toHaveBeenCalledWith('/persons', { name: 'test' })
    expect(service.api.post).toHaveBeenCalledTimes(1)
  })

  it('deve chamar o metodo delete quando deletar uma pessoa', () => {
    jest.spyOn(service.api, 'delete')
    service.delete(2)

    expect(service.api.delete).toHaveBeenCalledWith('/persons/2')
    expect(service.api.delete).toHaveBeenCalledTimes(1)
  })
})
