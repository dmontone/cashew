import Router from '~/router'
import { Header } from './components/Header'
import { Providers } from './providers'
import { Modal } from './components'

function App() {
  return (
    <>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <Providers>
        <Router />
        <Modal />
      </Providers>
    </>
  )
}

export default App
