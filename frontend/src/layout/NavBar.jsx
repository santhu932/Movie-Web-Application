import React, { useContext } from 'react'
import { FaFilm } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MovieContext from '../components/context/MovieContext'

function NavBar({ title }) {
  const {
    login,
    landing,
    setSearch,
    search,
    setLogin,
    setLanding,
  } = useContext(MovieContext)

  const handleLogout = () => {
    setLanding(false)
    setLogin(true)
  }

  const handleClick = (e) => {
    setSearch(!search)
  }

  return (
    <nav className="navbar mb-12 shadow-lg bg-neutral text-neutral-content">
      <div className="container mx-auto">
        <div className="flex-none">
          <FaFilm className="inline pr-2 mr-1 text-4xl" />
          <Link to={'/'} className="text-lg font-bold align-middle">
            {title}
          </Link>
        </div>
        <div className="flex-1 px-2 mx-2">
          <div className="flex justify-end">
            <Link
              onClick={handleClick}
              to={'/search'}
              className="btn btn-ghost btn-sm rounded-btn font-bold text-2xl"
            >
              <FaSearch />
            </Link>
            {landing && (
              <>
                <Link
                  to={'/home'}
                  className="btn btn-ghost btn-sm rounded-btn font-bold "
                >
                  Home
                </Link>
                {/* <Link to={'/profile'} className="btn btn-ghost btn-sm rounded-btn font-bold text-3xl">
                        <CgProfile/>
                    </Link> */}
                <Link
                  to={'/'}
                  onClick={handleLogout}
                  className="btn btn-ghost btn-sm rounded-btn font-bold "
                >
                  Logout
                </Link>
              </>
            )}
            {login && (
              <>
                <Link
                  to={'/signin'}
                  className="btn btn-ghost btn-sm rounded-btn font-bold "
                >
                  SignIn
                </Link>
                <Link
                  to={'/signup'}
                  className="btn btn-ghost btn-sm rounded-btn font-bold "
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

NavBar.defaultProps = {
  title: 'Matinee Review',
}

NavBar.propTypes = {
  title: PropTypes.string,
}

export default NavBar
