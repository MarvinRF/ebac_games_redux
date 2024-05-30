import { fireEvent, screen } from '@testing-library/react'
import { renderizaComProvider } from '../../../utils/tests'
import Produto from '../index'

const jogo = {
  id: 1,
  categoria: 'RPG',
  imagem: '',
  plataformas: ['Windows'],
  preco: 159.9,
  precoAntigo: 199.9,
  titulo: 'Elden Ring'
}

describe('testes para o componente produto', () => {
  test('deve renderizar corretamente', () => {
    renderizaComProvider(<Produto game={jogo} />)
    expect(screen.getByText('Elden Ring')).toBeInTheDocument()
  })
  test('Deve adicionar um item ao carrinho', () => {
    const { store } = renderizaComProvider(<Produto game={jogo} />)
    const botao = screen.getByTestId('btn-comprar')
    fireEvent.click(botao)

    store.getState().carrinho.itens
    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
