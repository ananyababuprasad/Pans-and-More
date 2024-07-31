import {useRef} from "react";
import {FaBars,FaTimes} from "react-icons/fa"
import {NavLink} from 'react-router-dom'
import {useLogout} from "../hooks/useLogout";
import {useAuthContext} from "../hooks/useAuthContext";
import {toast} from 'react-toastify';
import logo from "../images/logo.png";

const Navbar=()=>{
    const navRef=useRef(null);
    const {logout}=useLogout()
    const {user}=useAuthContext();

    const showNavbar =()=>{
        if (navRef.current) {
            navRef.current.classList.toggle("responsive_nav");
        }
    }

    const handleClick=()=>{
        logout()
        toast.success('Logged out')
    }
    
    return(
        <header>
            {user && 
            <nav ref={navRef}>
                <img src={logo}></img>
                <NavLink to='/' onClick={showNavbar} activeClassName="active">Pans&More</NavLink>
                <NavLink to='/home' onClick={showNavbar} activeClassName="active">Home</NavLink>
                <NavLink to='/create' onClick={showNavbar}activeClassName="active">New recipe</NavLink>
                <NavLink to="/search" onClick={showNavbar} activeClassName="active">Search</NavLink>
                <NavLink to={`/${user.user._id}/profile`} onClick={showNavbar} activeClassName="active">My Profile</NavLink>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            }
            {!user && 
            <nav ref={navRef}>
                <img src={logo}></img>
                <NavLink to='/' activeClassName="active">Pans&More</NavLink>
                <NavLink to='/login' activeClassName="active">login</NavLink>
                <NavLink to='/signup' activeClassName="active">signup</NavLink>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            }
            <button className="nav-btn" onClick={showNavbar}>
                    <FaBars/>
            </button>
            {user &&
                <div className="user-info-nav" align='right'>
                    <span>{user.user.username}</span>
                    <button onClick={handleClick}>Logout</button>
                </div>
            }
        </header>
    )
}

export default Navbar;