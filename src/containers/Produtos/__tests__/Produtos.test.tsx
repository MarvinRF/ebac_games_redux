import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { renderizaComProvider } from '../../../utils/tests'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import Produto from '../Produtos'

const mocks = [
  {
    id: 1,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows'],
    preco: 159.9,
    precoAntigo: 199.9,
    titulo: 'Elden Ring'
  },
  {
    id: 2,
    categoria: 'luta',
    imagem: '',
    plataformas: ['Windows'],
    preco: 159.9,
    precoAntigo: 199.9,
    titulo: 'Dragon Ball'
  },
  {
    id: 3,
    categoria: 'Luta',
    imagem: '',
    plataformas: ['Windows'],
    preco: 159.9,
    precoAntigo: 199.9,
    titulo: 'Tekken'
  },
  {
    id: 4,
    categoria: 'aventura',
    imagem: '',
    plataformas: ['Nintendo switch'],
    preco: 159.9,
    precoAntigo: 199.9,
    titulo: 'Pokemon Arceus'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)

describe('Testes para o container Produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('Deve renderizar o componente com o texto de carregamento', () => {
    renderizaComProvider(<Produto />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('Deve renderizar o componente como a listagem de jogos', async () => {
    renderizaComProvider(<Produto />)
    await waitFor(() =>
      expect(screen.getByText('Elden Ring')).toBeInTheDocument()
    )
  })
})
