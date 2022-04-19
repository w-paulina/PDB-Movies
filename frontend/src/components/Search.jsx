import React from 'react';
import '../css/reset.css'
import '../css/style.css'
import '../css/search.css'
import { getMovies, getGenres } from '../routes/movieRoutes';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { getUsers } from '../routes/userRoutes';


export function Search() {

    const urlMovie = "movie/";
    const urlUser = "profile/";

    useEffect(() =>{
        getMovies().then((resp)=>{setMovies(resp); console.log(resp) }); 
        getUsers().then((resp)=>{setUsers(resp); console.log(resp)}); 
        getGenres().then((resp) =>{setGenres(resp); console.log(resp)})
      }, []);
    
      const [movies, setMovies] = useState([]);
      const [users, setUsers] = useState([]);
      const [genres, setGenres] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');

  return (
    
    <div className="landing-page">
        <div className="container">       
            <div className="search-container">
                <div className="search-field">
                    <input type="text" className="search-input" placeholder="Szukaj..." onChange={event => {setSearchTerm(event.target.value)}}/>
                </div>
               
                <div className="search-box">
                    <div className="search-section search-section-movies ">
                        <div className="search-section-title">
                            <h1 className="search-section-title">Filmy</h1>
                        </div>
                        <div className="search-list"> 
                            {movies.filter((val) => {
                                if(searchTerm === ""){
                                    return val
                                } else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())
                                || genres.filter((obj) => {
                                    
                                    if(val.genre_id.find(element => element===obj.genre_id))
                                    {
                                        //console.log(obj.name)
                                        return obj;
                                    }
                                    return 0;
                                }).some(x => x.name.toLowerCase().includes(searchTerm.toLowerCase())))           
                                
                                {               
                                
                                    ///zeby sie przefiltrowaly to to musi w jakis sposob zwrocic true
                                    
                                    return val
                                }
                                return 0;
                                
                            }).map((val,key) => {
                                return <div className="search-link"><Link style={{textDecoration: 'none', color:'white'}} to={urlMovie + `${val.movie_id}`}><p>{val.title}</p></Link></div>
                            })}
                            </div>
                    </div>
                   <div className="search-section search-section-users">
                        <div className="search-section-title">
                            <h1 className="search-section-title">Użytkownicy</h1>
                        </div>
                        <div className="search-list">
                            {users.filter((val) => {
                                if(searchTerm === ""){
                                    return val
                                } else if(val.nickname.toLowerCase().includes(searchTerm.toLowerCase())){
                                    return val
                                }
                                return 0;
                            }).map((val,key) => {
                                return <div className="search-link"><Link style={{textDecoration: 'none', color:'white' }} to={urlUser + `${val.user_id}`}><p>{val.nickname}</p></Link></div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Search;