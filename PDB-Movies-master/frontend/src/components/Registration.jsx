import {signup} from '../routes/userRoutes'
import React from 'react';
import { useState} from 'react';
import '../css/reset.css'
import '../css/style.css'

export function Registration() {
    
    const initialValues = {username: "", email: "", password: "", repeatpassword: "", emailExists: "" };
    const [formValues, setformValues] = useState(initialValues);
    const [formErrors, setformErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformValues({...formValues, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setformErrors(validate(formValues));
    }


    const validate = (values) => {
        const errors = {};
        const regex = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
        if(!values.username){
            errors.username = "Podaj nazwę użytkownika!"
        }

        if(!values.email){
            errors.email = "Podaj email!"
        } else if (!regex.test(values.email)){
            errors.email = "Podaj poprawny format email!"
        }

        if(!values.password){
            errors.password = "Podaj hasło!";
        } else if (values.password.length < 8) {
            errors.password = "Hasło musi zawierać co najmniej 8 znaków!";
        }

        if (values.repeatpassword !== values.password || !values.repeatpassword){
            errors.repeatpassword = "Hasła muszą być takie same!";
        } 

        if(values.username && values.email && values.password && values.repeatpassword && regex.test(values.email) && values.password.length > 7 && values.repeatpassword === values.password){
            errors.emailExists = "Podany email jest już zarejestrowany."
        }

        return errors;
    }

    function checkStatus(){
        signup().then(resp=>{
            if(resp.status===422) console.log('Email juz uzyty')
            else if(resp.status===200) window.location.href="/confirmation";
        })
    }

    return (
    <div>

    <section className="landing-page">
        <div className="container">
            <div className="registration-box">
                <div className="box-logo">
                    <h1>Zarejestruj się</h1>
                </div>
                <form className="registration-form" onSubmit={ handleSubmit }>
                    <div className="form-element">
                        <label htmlFor="username">Nazwa użytkownika: </label>
                        <input type="text" id="username" name="username" value={ formValues.username } onChange={handleChange}/>
                        <p className="registration-error">{ formErrors.username }</p>
                    </div>
                    <div className="form-element">
                        <label htmlFor="email">E-mail: </label>
                        <input type="text" id="email" name="email" value={ formValues.email } onChange={handleChange}/>
                        <p className="registration-error">{ formErrors.email }</p>
                    </div>
                    <div className="form-element">
                        <label htmlFor="password">Hasło: </label>
                        <input type="password" id="password" name="password" value={ formValues.password } onChange={handleChange}/>
                        <p className="registration-error">{ formErrors.password }</p>
                    </div>
                    <div className="form-element">
                        <label htmlFor="repeatpassword">Powtórz hasło: </label>
                        <input type="password" id="repeatpassword" name="repeatpassword" value={ formValues.repeatpassword } onChange={handleChange}/>
                        <p className="registration-error">{ formErrors.repeatpassword }</p>
                        <p className="registration-error">{ formErrors.emailExists }</p>
                    </div>    
                    
                    <button type="submit" className="btn submit-button" onClick={()=>checkStatus()}>Zarejestruj</button>
                    </form>

                <div className="box-info">       
                    <div className="box-info-text">
                        <h2>Masz już konto?</h2>
                        <a href="login">Zaloguj się</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  );
}

export default Registration;