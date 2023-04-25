import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState({});
  //const [hasLoaded, setHasLoaded] = useState(false);

  async function getUsersWithTimeout(){
    const timeout = 20000;
    const controller = new AbortController()
    const id = setTimeout(()=>controller.abort(), timeout)
    const response = await fetch("https://book-club-web-server.vercel.app/users", {method:"GET", signal:controller.signal});
    clearTimeout(id)
    const parsedResponse = await response.json()
    return parsedResponse;
  }
  useEffect(()=>{
    getUsersWithTimeout()
    .then((data)=>{
      setUsers(data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>my users are: {JSON.stringify(users)}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
