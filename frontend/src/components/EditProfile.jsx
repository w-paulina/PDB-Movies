import React, { useEffect, useState } from 'react'
import '../css/reset.css'
import '../css/style.css'
import '../css/edit_profile.css'
import '../css/modal_editUsername.css'
import '../css/modal_editPassword.css'
import '../css/modal_changePicture.css'
import {getCurrentUser} from '../routes/userRoutes'
import {ModalUsername} from "./Modal_editUsername"
import {ModalPassword} from "./Modal_editPassword"
import {ModalChangePicture} from "./Modal_changePicture"


function EditProfile({match}) {

  const [user, setuser] = useState([]);

  const [userForm, setuserForm] = useState(false);
  const [passwordForm, setpasswordForm] = useState(false);
  const [picChanger, setpicChanger] = useState(false);

  const showUserForm = () => {
    setuserForm(prev => !prev);
  }

  const showPasswordForm = () => {
    setpasswordForm(prev => !prev)
  }

  const showPicChangerModal = () => {
    setpicChanger(true);
  }

  useEffect(() => {
    getCurrentUser().then(resp => {setuser(resp)})    
  }, []);

    return (
    <div>

    <section className="landing-page">
        <div className="container">
          <div className="edit-data-container">
            <h1>Edytuj profil</h1>
            <div className="edit-data-box">
              <div className="edit-photo-box">
              <img src={`${process.env.PUBLIC_URL}/photos/${user.profile_picture}`} alt='avatar' className="edit-photo-img"/>
                  <button className="btn form-element-button" onClick={showPicChangerModal}>Zmień zdjęcie</button>
                  {picChanger ? <ModalChangePicture setpicChanger={setpicChanger} /> : null}
                </div>
                <div className="edit-data-elements">
                  <div className="edit-form-element">
                    <div className="form-element-data">
                      <label htmlFor="username">Nazwa użytkownika: </label>
                      <span className="edit-username">{user.nickname}</span>
                    </div>
                    <button className="form-element-button btn" onClick={showUserForm}>Edytuj</button>
                  </div>
                  { userForm ? <ModalUsername/> : null } 
                  <div className="edit-form-element">
                    <div className="form-element-data">
                      <label htmlFor="username">Hasło: </label>
                      <span className="edit-username">********</span>
                    </div>
                    <button className="form-element-button btn" onClick={showPasswordForm}>Edytuj</button>
                  </div>
                  {passwordForm ? <ModalPassword setpasswordForm={setpasswordForm}/> : null}
                </div>
            </div>
          </div>
        </div>
    </section>
</div>
  );
}

export default EditProfile;