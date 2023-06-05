import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';

import largeLogo from 'assets/img/logo-large-transparent.png';
import smallLogo from 'assets/img/logo-small.png';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav id={styles.navbar}>
      <Link to="/">
        <img src={largeLogo} alt="Banga's Logo" id={styles.largeLogo} />
        <img src={smallLogo} alt="Banga's Logo" id={styles.smallLogo} />
      </Link>
      <ul>
        <li>
          <Link to="/cart">
            <i aria-label="Cart">
              <FontAwesomeIcon icon={faCartShopping} />
            </i>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <i aria-label="Profile">
              <FontAwesomeIcon icon={faUser} />
            </i>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
