import '../css/reset.css'
import '../css/style.css'
import '../css/footer.css'
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi"


export function Footer() {
    return(
        <footer>
        <div className="footer">
            <p>PDB © 2021</p>
            <div className="footer-links">
                <a href="https://instagram.com"><FiInstagram size={21}/></a>
                <a href="https://facebook.com"><FiFacebook size={21}/></a>
                <a href="https://twitter.com"><FiTwitter size={21}/></a>
            </div>
        </div>
        </footer>
    );
}
export default Footer;