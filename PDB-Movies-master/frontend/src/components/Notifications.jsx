import React from 'react';
import '../css/reset.css'
import '../css/style.css'
import '../css/notifications.css'
import {getNotifications} from '../routes/notificationsRoute'
import { acceptInvitation, declineInvitation } from '../routes/friendsRoute';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

export function Notifications(){

  const profileUrl = "/profile/";
  const movieUrl = "/movie/";
    const [notifications, setNotifications] = useState([]);

      useEffect(() =>{
        getNotifications().then(resp=>{setNotifications(resp)})
      }, []);

      function showAllnotifications(){
          if(notifications==='No notifications') return(
            <div className="notifications-list">Brak powiadomień.</div>
          )
          return(notifications.map(notification=>(
            <div className='notification-item'>
                {showNotification(notification)}
            </div>
        )))
      }

      function accInv(sender_id,notification_id){
        acceptInvitation(sender_id,notification_id);
        getNotifications().then(resp=>{setNotifications(resp)});
        window.location.reload(false);
      }

      function decInv(sender_id,notification_id){
        declineInvitation(sender_id,notification_id);
        getNotifications().then(resp=>{setNotifications(resp)});
        window.location.reload(false);
      }

    const showNotification = (notification) => {
        if(notification.type==='friendRequest') {
          return( 
            <div className="notification notification-invitation">
              <div className="notification-content">
                <p>Zaproszenie do grona znajomych od uzytkownika&nbsp;<Link to={profileUrl + `${notification.sender_id}`} style={{textDecoration:"none", color:"rgb(198,132,191)", fontWeight:"bolder"}}>{notification.nickname}</Link></p>
                <img src={`${process.env.PUBLIC_URL}/photos/${notification.sender_profile_picture}`} alt='avatar' className="notification-user-image"/>
              </div>
              <div className="notification-buttons">
                <button className="notification-button btn" onClick={()=>accInv(notification.sender_id, notification.notification_id)}>Przyjmij</button>&nbsp;&nbsp;
                <button className="notification-button btn" onClick={()=>decInv(notification.sender_id, notification.notification_id)}>Odrzuć</button>
              </div>
              </div>
             
          )}
        else if(notification.type==='recommendation'){
        return(
          <div className="notification notification-content">
            <p>Uzytkownik <Link to={profileUrl + `${notification.sender_id}`} style={{textDecoration:"none", color:"rgb(198,132,191)", fontWeight:"bolder"}}>{notification.sender_nickname}</Link>
            &nbsp;poleca Ci film <Link to={movieUrl + `${notification.movie_id}`} style={{textDecoration:"none", color:"rgb(198,132,191)", fontWeight:"bolder"}}>{notification.movie_title}&nbsp;
            </Link></p> <Link to={movieUrl + `${notification.movie_id}`} ><img src={`${process.env.PUBLIC_URL}/images/${notification.movie_thumbnail}`} alt='thumbnail' className="notification-movie-img"/></Link>
            
          </div>
        )}
    }
    return(
      <section className="landing-page">
        <div className="container">
          <div className="notifications-list-container">
            <div className="notifications-list">
              <h1>Powiadomienia</h1>
              {showAllnotifications()}
            </div>
          </div> 
        </div>
      </section>
        
    )
}

export default Notifications;