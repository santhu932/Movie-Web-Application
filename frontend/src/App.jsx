import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './layout/NavBar.jsx'
import Footer from './layout/Footer.jsx'
import Home from './components/pages/Home.jsx'
import { MovieProvider } from './components/context/MovieContext.jsx'
import SignIn from './components/pages/Signin.jsx'
import SignUp from './components/pages/Signup.jsx'
import Logout from './components/pages/Logout.jsx'
import Details from './components/pages/Details.jsx'


function App() {
  return (
    <MovieProvider>
      <Router>
        <div className="flex flex-col justify-between h-screen">
          <NavBar />

          <main className="container mx-auto px-3 pb-12 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Home />} />
              <Route
                path="/signin"
                element={
                  <SignIn>
                    <Routes>
                      <Route to={'/'} element={<Home />}></Route>
                    </Routes>
                  </SignIn>
                }
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/movie/:id" element={<Details />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </MovieProvider>
  )
}

export default App
