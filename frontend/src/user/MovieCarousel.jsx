import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import batman from '../components/images/batman.jpg'
import barbie from '../components/images/barbie.jpg'
import opp from '../components/images/opp.jpg'
import scoob from '../components/images/scooby.webp'
import shaw from '../components/images/shaw.jpg'
import up from '../components/images/up.avif'

function MovieCarousel() {
  return (
    <Carousel
      showIndicators={true}
      autoPlay={true}
      interval={2000}
      infiniteLoop={true}
      showThumbs={true}
      dynamicHeight={true}
      emulateTouch={true}
    >
      <div>
        <img src={barbie} alt="Barbie" />
      </div>
      <div>
        <img src={batman} alt="Batman" />
      </div>
      <div>
        <img src={opp} alt="Oppenhiemer" />
      </div>
      <div>
        <img src={scoob} alt="Scooby-Doo" />
      </div>
      <div>
        <img src={shaw} alt="Shawshank Redemption" />
      </div>
      <div>
        <img src={up} alt="Up" />
      </div>
    </Carousel>
  )
}

export default MovieCarousel
