import { render, screen, fireEvent } from '@testing-library/react'

import Contador from "./Contador";

describe("Contador", () => {
  it("deve iniciar com o valor 0", () => {
    render(<Contador />)

    const paragrafo = screen.getByRole('valorInicial')

    expect(paragrafo.textContent).toBe("0")
  })

  it("deve adicionar o valor 2 quando clicar 2 vezes no botão 'Adicionar +1'", () => {
    render(<Contador />)

    const paragrafo = screen.getByRole('valorInicial')
    const botao = screen.getByRole('botao')

    fireEvent.click(botao)
    fireEvent.click(botao)

    expect(paragrafo.textContent).toBe("2")
  })
})
