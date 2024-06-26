import { useEffect, useState } from 'react'
import Header from './components/Header'
import Produtos from './containers/Produtos/Produtos'

import { GlobalStyle } from './styles'
import { configuraStore } from './store'
import { Provider } from 'react-redux'

const store = configuraStore()

export type Game = {
  id: number
  titulo: string
  plataformas: string[]
  precoAntigo: number
  preco: number
  categoria: string
  imagem: string
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:4000/produtos')
      .then((res) => res.json())
      .then((res) => setGames(res))
  }, [])

  return (
    <Provider store={store}>
      <GlobalStyle />
      <div className="container">
        <Header />
        <Produtos />
      </div>
    </Provider>
  )
}

export default App
