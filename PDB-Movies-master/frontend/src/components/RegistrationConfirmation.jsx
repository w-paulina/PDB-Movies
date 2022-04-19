import React from 'react';
import '../css/reset.css'
import '../css/style.css'
import '../css/registration_confirmation.css'


export function RegistrationConfirmation() {
  return (
    <div>

    <section className="landing-page">
        <div className="container">
            <div className="welcome-box">
                <div className="welcome-box-header">
                    <h1 className="welcome-text-registration">Witaj w PDB movies!</h1>
                </div>
                
                <div className="welcome-box-text"> 
                    Dziękujemy za rejestrację w naszym serwisie. Zaloguj się, aby oglądać nasze najnowsze produkcje.
                </div>

                <a id='login' className="btn submit-button" href="/login">Zaloguj się</a>
                
            </div>
        </div>
    </section>
</div>
  );
}

export default RegistrationConfirmation;