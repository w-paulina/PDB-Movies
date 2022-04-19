import React, { useRef } from "react";
import ReactDom from "react-dom";
import {useEffect, useState} from 'react'
import { getFriends } from "../routes/friendsRoute";
import { recommend } from '../routes/userRoutes';
import { useAlert } from 'react-alert'

export const Modal = ({ setShowModal, movieId }) => {
 
  const [friends,setFriends] = useState([]); 
  const alert = useAlert();

  useEffect(() =>{
  getFriends().then(resp=>{setFriends(resp)});
  }, []);

  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  
  function showFriends(){
    if(friends==='You got no friends') return friends
    return(
      friends.map(user => 
        <div className="user-list-item">
          <h2 className="user-list-name" key={user.user_id}>{user.nickname}</h2>
            <button className="btn" onClick={()=>{
              recommend(user.user_id,movieId);
              alert.show("Polecono film!")}}>Poleć</button>
              </div>
          
        )
    )
  }

  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
          <h2 className="modal-header">Poleć film znajomym:</h2>
          <div className="modal-list">
          {showFriends()}
          </div>
          
          
      </div>
    </div>,
    document.getElementById("portal")
  );
};