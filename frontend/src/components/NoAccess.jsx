import React from 'react';
import '../css/reset.css'
import '../css/style.css'
import '../css/no_access.css'
import {FaExclamationTriangle} from "react-icons/fa"


export function NoAccess() {
  return (
    <div>

    <section className="landing-page">
        <div className="container">
            <div className="no-access-box">
                <div className="no-access-box-header">
                    <div className="no-access-header"><FaExclamationTriangle size="60"/></div>
                </div>
                
                <div className="no-access-text"> 
                    <h2>Brak dostępu!</h2>
                    Dostęp tylko dla zalogowanych użytkowników.
                     </div>

                <a id='login' className="btn submit-button" href="/">Przejdź na stronę główną</a>
                
            </div>
        </div>
    </section>
</div>
  );
}

export default NoAccess;