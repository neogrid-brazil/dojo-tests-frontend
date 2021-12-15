import GlobalContext from 'context/GlobalContext'

import Person from 'components/Person'

import './App.css'

function App() {
  return (
    <>
      <GlobalContext>
        <Person />
      </GlobalContext>
    </>
  )
}

export default App
