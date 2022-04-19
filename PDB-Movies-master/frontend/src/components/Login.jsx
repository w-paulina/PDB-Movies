import {login} from '../routes/userRoutes'
import React from 'react';
import '../css/reset.css'
import '../css/style.css'
import { useState } from 'react';


export function Login() {

    const initialValues = { email: "", password: "", wrongCred: ""}
    const [formValues, setformValues] = useState(initialValues);
    const [formErrors, setformErrors] = useState({});
    const [credErrVisible, setCredErrVisible] = useState('hidden')

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

        if(!values.email){
            errors.email = "Podaj email!"
        } 

        if(!values.password){
            errors.password = "Podaj hasło!";
        }

        if(values.password && values.email){
            errors.wrongCred = "Błędny email lub hasło!";
        }

        return errors;
    }

    return (
    <div>

    <section className="landing-page">
        <div className="container">
            <div className="login-box">
                <div className="box-logo">
                    <h1>Zaloguj się</h1>
                </div>
                
                <form className="registration-form" onSubmit={ handleSubmit }>
                    <div className="form-element">
                        <label htmlFor="email">E-mail: </label>
                        <input type="text" id="email" name="email" value={formValues.email} onChange={handleChange}/>
                        <p className="registration-error">{ formErrors.email }</p>
                    </div>
                        
                    <div className="form-element">
                        <label htmlFor="password">Hasło: </label>
                        <input type="password" id="password" name="password" value={formValues.password} onChange={handleChange}/>
                        <p className="registration-error">{ formErrors.password }</p>
                    </div>
                    <p className="registration-error">{formErrors.wrongCred}</p>
                    <button id='login' className="submit-button btn" onClick={login}>Zaloguj</button>
                </form>              
                
                {/* <div className="box-info">
                    <div className="box-info-text box-info-text-login">
                        <h2>Nie masz jeszcze konta?</h2>
                        <a href="registration">Zarejestruj się</a>
                    </div>
                    <div className="box-info-text box-info-text-login">
                        <h2>Nie pamiętasz hasła?</h2>
                        <a href="registration">Przypomnij hasło</a>
                    </div>
                </div> */}

                <div className="box-info">       
                    <div className="box-info-text">
                        <h2>Nie masz jeszcze konta?</h2>
                        <a href="registration">Zarejestruj się</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
  );
}

export default Login;