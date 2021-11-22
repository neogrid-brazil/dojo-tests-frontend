const person = require('./person');

beforeEach(() => {
  console.log('roda todas as vezes para cada test')
})

test('deve iniciar com nome vazio', () => {
  expect(person.name).toBe('')
})

test('deve inserir o nome quando chamado o metodo setName', () => {
  person.setName('Lucas T.')
  expect(person.name).toBe('Lucas T.')
})
