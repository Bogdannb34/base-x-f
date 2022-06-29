import { Link } from 'react-router-dom';
import { faStopwatch20, faIgloo, faA, faAddressCard, faUserPen, faUserAstronaut, faArrowUpRightFromSquare, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/navbar.css';

const Navbar = () => {
    return (
        <header className="header">
            <div id="menu-btn"><FontAwesomeIcon className='menu-icon' icon={faBars} /></div>
            <Link to="/" className='logo'><FontAwesomeIcon className='logo-icon' icon={faStopwatch20} />Base-X-Sports</Link>
            <nav className='navbar'>
                <div className='nav-left'>
                    <Link to="/rentals"><FontAwesomeIcon className='nav-icon' icon={faIgloo} />Rentals</Link>
                    <Link to="/about"><FontAwesomeIcon className='nav-icon' icon={faA} />About Us</Link>
                    <Link to="/contact"><FontAwesomeIcon className='nav-icon' icon={faAddressCard} />Contacts</Link>
                </div>
                <div className='nav-right'>
                    <Link to="/register"><FontAwesomeIcon className='nav-icon' icon={faUserPen} />Register</Link>
                    <Link to="/login"><FontAwesomeIcon className='nav-icon' icon={faUserAstronaut} />Login</Link>
                    <Link to="/logout"><FontAwesomeIcon className='nav-icon' icon={faArrowUpRightFromSquare} />Logout</Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar