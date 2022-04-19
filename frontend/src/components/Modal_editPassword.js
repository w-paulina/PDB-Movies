import React from "react";
import { changePassword } from "../routes/userRoutes";
import { useAlert } from "react-alert";

export const ModalPassword = ({setpasswordForm}) => {
  
    const alert = useAlert();

  return (
          <form className="form-edit-password">

            <div>
                <div className="form-edit-element">
                    <label htmlFor="password">Obecne hasło:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <div className="form-edit-element">
                    <label htmlFor="new_password">Nowe hasło:</label>
                    <input type="password" id="new_password" name="new_password" />
                </div>
                <div className="form-edit-element">
                    <label htmlFor="confirm_new_password">Powtórz nowe hasło:</label>
                    <input type="password" id="confirm_new_password" name="confirm_new_password" />
                </div>
            </div>
              
              <button type="button" className="form-edit-button btn" onClick={()=>{changePassword();setpasswordForm(false);alert.show('Hasło zostało zmienione.')}}>Zapisz</button>
          </form>
  )
};