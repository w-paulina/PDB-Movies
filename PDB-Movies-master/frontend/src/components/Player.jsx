import React, { useState, useEffect } from 'react'
import {getMovieById, addToFavourites, removeFromFavourites, addToWatch, removeFromWatch, isFavourite, isTooWatch} from '../routes/movieRoutes'
import * as commentsApi from '../routes/commentRoute'
import {getCurrentUser} from '../routes/userRoutes'
import { getUserCommentLike, getComments} from '../routes/commentRoute'
import { getRatingsByMovieId } from '../routes/ratingRoute'
import '../css/reset.css'
import '../css/style.css'
import '../css/modal.css'
import "../css/comments.css"
import angleSmallRight from "../icons/angle-small-right.png"
import thumbsUp from "../icons/thumbs-up.png"
import thumbsDown from "../icons/thumbs-down.png"
import thumbsUpActive from "../icons/thumbs-up-active.png"
import thumbsDownActive from "../icons/thumbs-down-active.png"
import commentIcon from "../icons/comment.png"
import following from "../icons/following.png"
import { Modal } from "./Modal_recommend";
import { FaStar, FaRegHeart, FaRegEye } from 'react-icons/fa'
import "../css/starrating.css"
import { addRating, getUserRate } from '../routes/ratingRoute';
//import { useAlert } from 'react-alert'
import {Link} from 'react-router-dom'


function Player({match}) {

    const profileUrl = "/profile/";
   // const alert = useAlert();

    const [user, setUser] = useState([]);
    const [movie, setMovie] = useState([]);
    const [comments, setComments] = useState([]); 
    const [showModal, setShowModal] = useState(false);
    const [ratingAvg, setRatingAvg] = useState([]);
    const [hover, setHover] = useState(null);
    const [rating, setRating] = useState(null);
    const [isFavoutite, setIsFavourite] = useState(false);
    const [isToWatch, setIsToWatch] = useState(false);
    const [state, updateState] = useState()
    const forceUpdate = React.useCallback(() => updateState({}), []);


    const openModal = () => {
        setShowModal(true);
    };

    useEffect(() =>{
        //getCommentLikes(1).then(resp=>setLikes(resp))
        getCurrentUser().then(resp=>{setUser(resp)})
        getMovieById(match.params.id).then(resp=>{setMovie(resp)});
        getComments(match.params.id).then(resp=>{setComments(resp)});
        getRatingsByMovieId(match.params.id).then(resp=>{
            if(resp==='No rates'){setRatingAvg({averageRate: 'Brak ocen', ratesAmount: '1'})}
            else {setRatingAvg(resp)}})
        getUserRate(match.params.id).then((resp)=>{setRating(resp)});
        isFavourite(match.params.id).then(resp=>setIsFavourite(resp));
        isTooWatch(match.params.id).then(resp=>setIsToWatch(resp));
    }, [match.params.id]);   

    function buttonFavourites(){
        if(isFavoutite){
            removeFromFavourites(match.params.id).then((resp)=>{
              //  if(resp==="Movie successfully deleted from favourites")alert.show("Usunięto film z ulubionych.")
               // else alert.show("Usuwanie nie powiodło się.")
            })
        }else{
            addToFavourites(match.params.id).then((resp)=>{
               // if(resp==="Movie added to favourites")alert.show("Dodano film do ulubionych!")
               // else alert.show("Nie udało się dodać filmu do ulubionych :(")
            })
        }
        setIsFavourite(!isFavoutite)
    }

    function buttonToWatch(){
        if(isToWatch){
            removeFromWatch(match.params.id).then((resp)=>{
               // if(resp==="Movie successfully deleted from ToWatch playlist!")alert.show("Usunięto z listy Do Obejrzenia.")
               // else alert.show("Usuwanie nie powiodło się.")
            })
        }else{
            addToWatch(match.params.id).then((resp)=>{
               // if(resp==="Movie added to ToWatch playlist") alert.show("Dodano film do obejrzenia później!")
                //else alert.show("Nie udało się dodać filmu :(")
            })
        }
        setIsToWatch(!isToWatch)
    }

    function StarRating(){
        return (
            <div>
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
    
                    return (
                        <label>
                            <input 
                                type="radio" 
                                name="rating" 
                                value={ratingValue} 
                                onClick={() => {
                                    setRating(ratingValue);
                                    addRating(ratingValue,match.params.id);
                                    getRatingsByMovieId(match.params.id).then(resp=>{setRatingAvg(resp)})
                                }}
                                />
                                
                            <FaStar  
                                className="star" 
                                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9" } 
                                size={25}
                                onMouseEnter={() => {setHover(ratingValue);getRatingsByMovieId(match.params.id).then(resp=>{setRatingAvg(resp)})}}
                                onMouseLeave={() => {setHover(null);getRatingsByMovieId(match.params.id).then(resp=>{setRatingAvg(resp)})}}
                                />
                        </label>  
                    );
                })}   
            </div>
        )
    }


    const addComment = async () => {
        
        let field = document.getElementById("content");
        let content = field.value;
        field.value = null;
        
        const comment = {
            movie_id: movie.movie_id,
            comment_content: content
        }

        //await commentsApi.post(`/add`,comment);
        await commentsApi.addComment(comment);
        await commentsApi.getComments(match.params.id).then(resp=>{setComments(resp)});
    }

    function showComments(){
        if(comments!=="No comments"){
        return(comments.map(comment => (
            <div key={comment.comment_id} class="comment-item">    
                  
                <div class="comment-avatar">
                <Link to={profileUrl + `${comment.user_id}`} style={{textDecoration: "none", color:"white"}}> <img src={`${process.env.PUBLIC_URL}/photos/${comment.profile_picture}`} alt='avatar' className="comment-avatar-image"/></Link>
                </div>
                <div class="comment-section-right">
                <Link to={profileUrl + `${comment.user_id}`} style={{textDecoration: "none", color:"white"}}><h3 class="author"> {comment.nickname} </h3></Link>
                    <div class="comment-content comment-content-bg">
                        <span class="comment-content-text"> {comment.comment_content} </span>
                        
                        <div class="comment-action-buttons">
                            {console.log(comment)}
                    <button id="like" class="movie-btn comment-action-btn" type="button" onClick={()=>{addDeleteCommentLike(comment.comment_id)}}><img src={comment.is_positive===true ? thumbsUpActive : thumbsUp} class="comment-btn-img" alt="Like button"/></button>
                    <button id="dislike" class="movie-btn comment-action-btn" type="button" onClick={()=>{addDeleteCommentUnlike(comment.comment_id)}}><img src={comment.is_positive===false ? thumbsDownActive : thumbsDown} class="comment-btn-img" alt="Dislike button"/></button>             
                    </div>
                            
                    </div>
                </div>
            </div>
            )))}
    }
    
    function showCommentLikeButtons(comment){
        //console.log(comment)
            if(comment.is_positive===null){
                return(
                    <div class="comment-action-buttons">
                    <button id="like" class="movie-btn comment-action-btn" type="button" onClick={()=>{addDeleteCommentLike(comment.comment_id)}}><img src={thumbsUp} class="comment-btn-img" alt="Like button"/></button>
                    <button id="dislike" class="movie-btn comment-action-btn" type="button" onClick={()=>{addDeleteCommentUnlike(comment.comment_id)}}><img src={thumbsDown} class="comment-btn-img" alt="Dislike button"/></button>             
                    </div>
                )
            }else if(comment.is_positive===true){
                //console.log('show')
                return(
                    <div class="comment-action-buttons">
                    <button id="like" class="movie-btn comment-action-btn" type="button" onClick={()=>{addDeleteCommentLike(comment.comment_id)}}><img src={thumbsUpActive} class="comment-btn-img" alt="Like button"/></button>
                    <button id="dislike" class="movie-btn comment-action-btn" type="button" onClick={()=>{addDeleteCommentUnlike(comment.comment_id)}}><img src={thumbsDown} class="comment-btn-img" alt="Dislike button"/></button>             
                    </div>
                )
            }else{
                //console.log('show')
                return(
                    <div class="comment-action-buttons">
                    <button id="like" class="movie-btn comment-action-btn" type="button" onClick={()=>{addDeleteCommentLike(comment.comment_id).then(forceUpdate())}}><img src={thumbsUp} class="comment-btn-img" alt="Like button"/></button>
                    <button id="dislike" class="movie-btn comment-action-btn" type="button" onClick={()=>{addDeleteCommentUnlike(comment.comment_id).then(forceUpdate())}}><img src={thumbsDownActive} class="comment-btn-img" alt="Dislike button"/></button>             
                    </div>
                )
            }
            
        
    }

    const addDeleteCommentLike = async (comment_id)=>{
        await commentsApi.getUserCommentLike(comment_id).then(resp=>{
            if(resp.data==='No like') {commentsApi.addCommentLike(true,comment_id);console.log('Dodano like')}
        else if(resp.data.is_positive===true) {commentsApi.deleteCommentLike(comment_id);console.log('Usunięto like')}
            else{
                commentsApi.deleteCommentLike(comment_id);
                commentsApi.addCommentLike(true,comment_id);
                console.log('Zmieniono like')
            }
        })
        await commentsApi.getComments(match.params.id).then(resp=>{setComments(resp);console.log('state')});
        forceUpdate()

    }

    const addDeleteCommentUnlike = async (comment_id)=>{
        await commentsApi.getUserCommentLike(comment_id).then(resp=>{
            //console.log(resp)
            if(resp.data==='No like') {commentsApi.addCommentLike(false,comment_id);console.log('Dodano like')}
        else if(resp.data.is_positive===false) {commentsApi.deleteCommentLike(comment_id);console.log('Usunięto like')}
            else{
                commentsApi.deleteCommentLike(comment_id);
                commentsApi.addCommentLike(false,comment_id);
                console.log('Zmieniono like')
            }
        })
        await commentsApi.getComments(match.params.id).then(resp=>{setComments(resp)});
        forceUpdate()
    }

    return (
        <div>
            <section className=" container">
        <div className="movie-player-container">
            <div className="movie-player">
                <video id="videoPlayer" width="100%" controls muted="muted" autoPlay src={`http://localhost:5000/api/stream/play/${match.params.id}`} type="video/mp4"></video>
            </div>
            <div className="movie-info-box">
                <div className="movie-rating-info">
                    <h2 className="movie-title">{movie.title}</h2>
                    <div className="star-rating">
                        {StarRating(movie.movie_id)}
                        ({ratingAvg.averageRate})

                    </div>
                    
                </div>
                <div className="movie-action-btn-box">
                    <button className="movie-btn movie-action-btn" onClick={()=>buttonFavourites()}>{isFavoutite ? <FaRegHeart className="movie-action-btn-img" color="#ff4d4d" /> : <FaRegHeart className="movie-action-btn-img" color="white" />}</button>
                    <button className="movie-btn movie-action-btn" onClick={openModal}><img className="movie-action-btn-img" src={following} alt="following"/></button>
                    {showModal ? <Modal setShowModal={setShowModal} movieId={movie.movie_id} /> : null}
                    <button className="movie-btn movie-action-btn" onClick={()=>buttonToWatch()}> {isToWatch ? <FaRegEye className="movie-action-btn-img" color="#ff4d4d"/> : <FaRegEye className="movie-action-btn-img" color="white"/>}</button>                    
    
                </div>
                
            </div>
        </div>
        
    </section>

    <section class="comments container"> 
        <div class="comments-header">
            <img src={commentIcon} class="comment-icon"  alt="Comment icon" />
            <h1>Komentarze</h1>
        </div>

        <div class="comments-container">
            <div class="comment-form">
                <div class="comment-avatar">
                    <img src={`${process.env.PUBLIC_URL}/photos/${user.profile_picture}`} alt='avatar' className="comment-avatar-image"/>
                </div>
                <form class="comment-form-section-right">
                <div class="comment-section-right">
                    <div class="comment-content-bg comment-response-content">
                        <input id="content" type="text" class="comment-form-input" placeholder="Napisz komentarz..."/>
                    </div>
                </div>
                <button type="button" onClick={addComment} class="movie-btn comment-btn-confirm"><img src={angleSmallRight} class="comment-btn-confirm-img" alt="Submit button"/></button>
                </form>
            </div>
        </div>

        <div class="comments-container comments-list">
        {showComments()}
        </div>        
    </section>
            
        </div>
    )
}


export default Player;