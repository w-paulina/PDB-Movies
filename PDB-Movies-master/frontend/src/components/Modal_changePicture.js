import React, { useState } from "react";
import ReactDom from "react-dom";
import { changeProfilePic } from "../routes/userRoutes";

const photos = [{value: 'avatar2.png'}, {value: 'avatar3.png'}, {value: 'avatar4.png'}, {value: 'avatar5.png'}, {value: 'avatar6.png'}, {value: 'avatar7.png'},
    {value: 'avatar8.png'}, {value: 'avatar9.png'}, {value: 'avatar10.png'}, {value: 'avatar11.png'}]

export const ModalChangePicture = ({ setpicChanger}) => { 

    const [chosenPic, setchosenPic] = useState(null)

  return ReactDom.createPortal(
    <div className="container-change-picture" >
        <h1>Wybierz zdjęcie</h1>
        <div className="pictures-container">
          {photos.map(photo => {
              return (
                <label>
                <input type="radio" name="photo" value={photo.value} onClick={() => setchosenPic(photo.value)}/>
                    <img src={`${process.env.PUBLIC_URL}/photos/${photo.value}`} alt='avatar' className="edit-picture-img"/>
                    {console.log(chosenPic)}
                </label>
              )
          })}
        </div>
        <div className="edit-picture-buttons">
            <button className="btn edit-picture-button" onClick={() => {changeProfilePic(chosenPic);setpicChanger(false);window.location.reload(true);}}>Zapisz</button>
            <button className="btn edit-picture-button" onClick={() => {setpicChanger(false)}}>Anuluj</button>
        </div>
    </div>,
    document.getElementById("portal")
  );
};