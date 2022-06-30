import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faStopwatch20, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/navbar.css';

const Navbar = () => {

    const [menuIcon, setMenuIcon] = useState(false);

    const handleMenuIcon = () => setMenuIcon(!menuIcon);

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
                <Link to="/logout">Logout</Link>
            </nav>
        </header>
    )
}

export default Navbar