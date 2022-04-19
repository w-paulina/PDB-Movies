import '../css/reset.css'
import '../css/style.css'
import '../css/navbar.css'
import { useState , useEffect } from 'react'
import Logo from "../icons/logo.png"
import {BsList} from "react-icons/bs"

export function Navigation() {

    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const ToggleNav = () => {
        setToggleMenu(!toggleMenu)
    }

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth)
            },[])

    return(
        <nav>
        <div className="navbar">
        <div className="nav-header">
            <a href="/" className="nav-logo" ><img src={Logo} className='nav-logo-img' alt="logo"/><p className="app-name">PDB Movies</p></a>
            <button className="nav-btn" onClick={ToggleNav}><BsList className="nav-btn" style={{color: 'white'}} /></button>
        </div>

            { (toggleMenu || screenWidth > 768) && (
            <div className="nav-links nav-links-a ">
                <a href="/search" className='nav-link'>Szukaj</a>
                <a href="/login" className='nav-link'>Zaloguj się</a>
                <a href="/registration" className='nav-link'>Zarejestruj się</a>
            </div>)
            }
        </div>
        </nav>
    );
}
export default Navigation;