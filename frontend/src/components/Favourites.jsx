import '../css/reset.css'
import '../css/style.css'
import '../css/favourites.css'
import React, { useState, useEffect } from 'react'
import Star from "../icons/star.png"
import Following from "../icons/following.png"
import Heart from "../icons/heart.png"
import Eye from "../icons/eye.png"
import {Link} from 'react-router-dom'
import StarRatingStatic from './StarRatingStatic';
import { getRatedMovies, getFavouritesMovies, getToWatchMovies, getRecommendedMovies } from '../routes/movieRoutes';

function Favourites() {

    const url = "movie/";

    const [ratedMovies, setRatedMovies] = useState([]);
    const [favouritesMovies, setFavouritesMovies] = useState([]);
    const [toWatchMovies, setToWatchMovies] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);

    useEffect(() =>{
        getRatedMovies().then(resp=>setRatedMovies(resp));
        getFavouritesMovies().then(resp=>setFavouritesMovies(resp));
        getToWatchMovies().then(resp=>setToWatchMovies(resp));
        getRecommendedMovies().then(resp=>setRecommendedMovies(resp));
      }, []);
    
    function showRatedMovies(){
        if(ratedMovies==='No movies were rated'){
            return(
            <div className="no-fav-movie-list">
                <p>Nie masz jeszcze żadnego filmu w tej sekcji.</p>
            </div>
        )
        }
        return(
            ratedMovies.map(movie => (
                <a key={movie.movie_id} className="fav-movie-item">
                <Link to={url + `${movie.movie_id}`}>
                    <img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} className="fav-movie-cover-img" alt={movie.title} key={movie.movie_id}/>
                    <div className="movie-item-section-right">
                    <div className="fav-movie-info">
                        <p className="fav-movie-title">{movie.title}</p>
                        <p className="year-of-production">{movie.year_of_production}</p>
                    </div>
                    <div className="rating">{StarRatingStatic(movie.rate)}</div>
                    </div> 
                </Link>
                </a>
             ))
        )
    }

    function showFavouritesMovies(){
        if(favouritesMovies==='No favourite movies') {
            return(
            <div className="no-fav-movie-list">
            <p>Nie masz jeszcze żadnego filmu w tej sekcji. </p> 
            </div>
        )
        }
        return(
        favouritesMovies.map(movie => (
            <a key={movie.movie_id} className="fav-movie-item">
            <Link to={url + `${movie.movie_id}`}>
                <img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} className="fav-movie-cover-img" alt={movie.title} key={movie.movie_id}/>
                <div className="movie-item-section-right">
                <div className="fav-movie-info">
                    <p className="fav-movie-title">{movie.title}</p>
                    <p className="year-of-production">{movie.year_of_production}</p>
                </div>
                </div> 
            </Link>
            </a>)
         ))
    }

    function showToWatchMovies(){
        if(toWatchMovies==='No ToWatch movies') {
            return(
            <div className="no-fav-movie-list">
                <p>Nie masz jeszcze żadnego filmu w tej sekcji.</p>
            </div>
        )
        }
        return(
            toWatchMovies.map(movie => (
                <a key={movie.movie_id} className="fav-movie-item">
                <Link to={url + `${movie.movie_id}`}>
                    <img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} className="fav-movie-cover-img" alt={movie.title} key={movie.movie_id}/>
                    <div className="movie-item-section-right">
                    <div className="fav-movie-info">
                        <p className="fav-movie-title">{movie.title}</p>
                        <p className="year-of-production">{movie.year_of_production}</p>
                    </div>
                    </div> 
                </Link>
                </a>
             ))
        )
    }

    function showRecommendedMovies(){
        if(recommendedMovies==='No recommended movies') {
            return(
            <div className="no-fav-movie-list">
                <p>Nie masz jeszcze żadnego filmu w tej sekcji.</p>
            </div>
        )
        }
        return(
            recommendedMovies.map(movie => (
                <a key={movie.movie_id} className="fav-movie-item">
                <Link to={url + `${movie.movie_id}`}>
                    <img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} className="fav-movie-cover-img" alt={movie.title} key={movie.movie_id}/>
                    <div className="movie-item-section-right">
                    <div className="fav-movie-info">
                        <p className="fav-movie-title">{movie.title}</p>
                        <p className="year-of-production">{movie.year_of_production}</p>
                    </div>
                    </div> 
                </Link>
                </a>
             ))
        )
    }

    return (
        <div className="landing-page">
            <section className="container">
                    <div classname="favourites-page">
                        <div className="fav-movies-section-box ">
                            <div className="section-header">
                                <img src={Star} alt='star' className="header-icon"/>
                                <h2>Ocenione filmy</h2>
                            </div>
                                <div className="fav-movie-list">
                                {showRatedMovies()}  
                                </div>
                            </div>
                        
                        <div className="fav-movies-section-box">
                            <div className="section-header">
                                <img src={Heart} alt='heart' className="header-icon"></img>
                                <h2>Ulubione filmy</h2>
                            </div>
                            <div className="fav-movie-list">
                                {showFavouritesMovies()}  
                            </div>
                        </div>
                        <div className="fav-movies-section-box">
                            <div className="section-header">
                                <img src={Eye} alt='eye' className="header-icon"></img>
                                <h2>Do obejrzenia</h2>
                            </div>
                            <div className={toWatchMovies ? `fav-movie-list` : `no-fav-movie-list`}>
                                {showToWatchMovies()}  
                            </div>
                        </div>
                        <div className="fav-movies-section-box">
                            <div className="section-header">
                                <img src={Following} alt='following' className="header-icon"></img>
                                <h2>Polecone przez znajomych</h2>
                            </div>
                            <div className="fav-movie-list">
                                {showRecommendedMovies()}  
                            </div>
                        </div>
                        </div>
            </section>
            </div>

    )
}

export default Favourites;
