import React from 'react'
import FilmReel from '../components/images/reel.jpeg'

function Footer() {
  const footerYear = new Date().getFullYear()
  return (
    <footer className="footer p-5 bg-sky-500 text-primary-content footer-center">
      <div className="p-0 m-0">
        <img
          className="bg-sm scale-50 p-0 m-0"
          src={FilmReel}
          alt="film reel image"
        ></img>
        <p>Copyright &copy; {footerYear} KSP. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer
