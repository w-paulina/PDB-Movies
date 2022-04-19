import '../css/reset.css'
import '../css/style.css'
import '../css/profile.css'
import Envelope from "../icons/envelope.png"
import Stats from "../icons/stats.png"
import Star from "../icons/star.png"
import Heart from "../icons/heart.png"
import Users from "../icons/users.png"
import {FaPercent} from "react-icons/fa"
import UserRemove from "../icons/user-remove.png"
import UserAccept from "../icons/user-accept.png"
import {getUserById} from '../routes/userRoutes'
import {useEffect, useState} from 'react'
import StarRatingStatic from './StarRatingStatic'
import {Link} from 'react-router-dom'
import PieChart from './PieChart'
import { Modal } from './Modal_removeFriend'
import { declineInvitation, acceptInvitation, sendInvitation, removeFriend, areFriends, coverage, cancelFriendRequest } from '../routes/friendsRoute'
import { getFriendFavourites, getFriendRated } from '../routes/movieRoutes'

function Profile({match}) {

      const [user, setUser] = useState([]);
      const [rated, setRated] = useState([]);
      const [favourites, setFavourites] = useState([]);
      const [status, setStatus] = useState([]);
      const [showModal, setShowModal] = useState(false);
      const [cov, setCov] = useState()
   
    const openModal = () => {
        setShowModal(true);
    };

      useEffect(() =>{
        getFriendRated(match.params.id).then(resp=>setRated(resp));
        getFriendFavourites(match.params.id).then(resp=>setFavourites(resp));
        getUserById(match.params.id).then(resp=>{setUser(resp[0])});
        areFriends(match.params.id).then((resp)=>setStatus(resp));
      }, [match.params.id]);

      useEffect(()=>{
        coverage(match.params.id).then(resp=>setCov(resp.data.tasteCoverage))
      }, [match.params.id])
    
      const url = "/movie/";

      function sendInv(){
        sendInvitation(user.user_id);
        setStatus('send')
      }

      function acceptInv(){
        acceptInvitation(user.user_id);
        setStatus('friend');
      }

      function declineInv(){
          declineInvitation(user.user_id);
          setStatus('notFriend');
      }

      function cancelRequest(){
          cancelFriendRequest(user.user_id);
          setStatus('notFriend');
      }

    function showUserButtons(){

        if(status==="friend"){
            return(
                <div className="user-buttons">
                    <button className="user-button" ><img src={Envelope} className="user-button-img" alt="button"/></button>
                    <button className="user-button" onClick={openModal}><img src={UserRemove} className="user-button-img" alt="button"/></button>
                    {showModal ? <Modal setShowModal={setShowModal} user_id={user.user_id} /> : null}
                </div>
            )
        }
        else if(status==="notFriend"){
            return(
                <div className="user-buttons">
                    <button className="user-button" onClick={()=>{sendInv()}}><img src={Users} className="user-button-img" alt="button"/></button>
                    
                </div>
            )
        }else if(status==="invitationWaiting"){
            return(
            <div className="user-buttons">
                <button className="user-button" onClick={()=>{acceptInv()}}><img src={UserAccept} className="user-button-img" alt="button"/></button>
                <button className="user-button" onClick={()=>{declineInv()}}><img src={UserRemove} className="user-button-img" alt="button"/></button>
            </div>
            )
        }else{
            return(
            <div className="user-buttons">
                <button className="user-button" onClick={()=>{cancelRequest()}}><img src={UserRemove} className="user-button-img" alt="button"/></button>
            </div>
            )
        }
    
    }

    function showFavourites(){
        if(favourites==='Your friend has no favourite movies yet') return favourites
        return(
            favourites.map(movie => (
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

    function showRated(){
        if(rated==='Your friend has no rated movies yet') return rated
        return(
            rated.map(movie => (
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

    return(
        <section className="container">
            <div className="fr-user-info">
                <div className="fr-user-avatar">
                    <img src={`${process.env.PUBLIC_URL}/photos/${user.profile_picture}`} alt='user' className="fr-user-avatar-image"/>
                </div>
                <div className="fr-user-section-right">
                    <div className="fr-user-body">
                        <div className="prof-user-name" >{user.nickname}</div>
                        <div className="prof-user-email" >{user.email}</div>
                    </div>
                    {showUserButtons()}
                </div>
            </div>
            
            <div className="statistics-section">
            <div className="statistics-section-item stats-section">
                <div className="header-section">
                    <img src={Stats} alt='stats' className="stats-header-icon"/>
                    <h2>Statystyki obejrzanych filmów</h2>
                </div>
                <PieChart />
    
            </div>
            <div className="statistics-section-item similarity-section">
                <div className="header-section">
                    <FaPercent className="percent-icon" />
                    <h2>Podobieństwo gustów</h2>
                </div>
                <div className='similarity-box'>
                <h1 className='similarity-value'>{cov}%</h1>
                </div>
            </div>
        
            </div>

            <div className="favourites-section">
            <div className="fav-movies-section-box ">
                            <div className="section-header">
                                <img src={Star} alt='star' className="header-icon"/>
                                <h2>Ocenione filmy</h2>
                            </div>
                            <div className="fav-movie-list">
                                {showRated()}  
                                </div>
                            </div>
                        
                        <div className="fav-movies-section-box">
                            <div className="section-header">
                                <img src={Heart} alt='heart' className="header-icon"></img>
                                <h2>Ulubione filmy</h2>
                            </div>
                            <div className="fav-movie-list">
                                {showFavourites()}  
                            </div>
                        </div>
                
            </div>

    </section>
        
    );
}
export default Profile;