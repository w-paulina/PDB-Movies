import '../css/reset.css'
import '../css/style.css'
import '../css/moviebrowser.css'
import '../css/movielistpage.css'
import '../css/home_notlogged.css'
import React, { useState, useEffect } from 'react'
import PhotoCollage from "../icons/kolaz.png"
import { Swiper, Navigation} from 'swiper';
import { getMovies } from '../routes/movieRoutes'

function Home() {

  useEffect(() =>{
    getMovies().then((res)=>{setMovies(res)});
  }, []);

  const [movies, setMovies] = useState([]);

  Swiper.use([Navigation]);
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    slidesPerView: 3,
    loop: true,
    spaceBetween:5 ,
    slidesPerGroup: 2,
    freeMode: true,
    speed: 500,
    breakpoints: {
      370: {
        slidesPerView:3
      },
      440: {
        slidesPerView:3
      },
      500: {
        slidesPerView: 4
      },
      640: {
        slidesPerView: 5
      },
      880: {
        slidesPerView: 6,
      },
      1000: {
        slidesPerView: 5,
      },
      1100: {
        slidesPerView: 6,
      },
      1430: {
        slidesPerView: 7,
      }
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

  });

  
  return (
    <div className='homepage'>
      

    <section className="home-page-container">
            <div className="container">
                <div className="home-page">
                <div className="photo-collage">
                    <h1>Tylko u nas!</h1>
                    <img src={PhotoCollage} className="photo-collage-img" alt="PhotoCollage"/>
                </div>
                <div className="welcome-text">
                    <p>
                        Dołącz do nas, aby oglądać <br/>najnowsze produkcje.
                    </p>
                    <a href="registration" class="submit-button btn btn-signup">Zarejestruj się</a>
                </div>
            </div>
        </div>
        </section>

        <section className="movie-list-container container">
          
          <div className="movie-genre-box">
              <h2 className="main-movie-genre-title">Nowości</h2> 
              <div class="swiper">
                  <div class="swiper-wrapper">
                  {movies.map(movie => (
                    <div class="swiper-slide">
                      <a href="#" key={movie.movie_id}>
                          <div className="movie-item">
                            <img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} className="movie-cover" alt={movie.title} key={movie.movie_id}/>
                            <div class="image-overlay">
                              <div class="movie-title-overlay">{movie.title}
                              </div>
                            </div>
                        </div>    
                        </a>
                        </div>
                    ))} 
                  </div>
                  <div class="swiper-button-prev"></div>
                  <div class="swiper-button-next"></div>
                </div>
          </div> 
    </section>
    </div>
  );
}


export default Home;