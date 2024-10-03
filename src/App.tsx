import Router from "~/router";
import { Header } from "./components/Header";
import { DashProvider } from './context'

function App() {
  return (
    <>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <DashProvider>
        <Router />
      </DashProvider>
    </>
  );
}

export default App;
