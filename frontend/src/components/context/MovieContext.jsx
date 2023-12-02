import { createContext, useState } from 'react'


const MovieContext = createContext()

export const MovieProvider = ({ children }) => {
  const [login, setLogin] = useState(true)
  const [landing, setLanding] = useState(false)
  const [search, setSearch] = useState(false)
  const [sampleData, setSampleData] = useState([])

  return (
    <MovieContext.Provider
      value={{
        sampleData,
        setSampleData,
        setLogin,
        setLanding,
        search,
        setSearch,
        login,
        landing,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export default MovieContext
