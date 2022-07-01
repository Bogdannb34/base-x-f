import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faStopwatch20, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useLogout from '../hooks/useLogout';
import '../styles/navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const logout = useLogout();
    const [menuIcon, setMenuIcon] = useState(false);

    const handleMenuIcon = () => setMenuIcon(!menuIcon);

    const signOut = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <header className="header">
            <div id="menu-btn" onClick={handleMenuIcon}><FontAwesomeIcon className='menu-icon' icon={menuIcon ? faTimes : faBars} /></div>
            <Link to="/" className='logo'><FontAwesomeIcon className='logo-icon' icon={faStopwatch20} />Base-X-Sports</Link>
            <nav className={menuIcon ? 'navbar active' : 'navbar'}>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/rentals">Rentals</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contacts</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <button onClick={signOut}>Logout</button>
            </nav>
        </header>
    )
}

export default Navbar