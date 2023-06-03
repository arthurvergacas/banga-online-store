import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';

import largeLogo from '../../assets/img/logo-large-transparent.png';
import smallLogo from '../../assets/img/logo-small.png';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav id={styles.navbar}>
      <a href="/">
        <img src={largeLogo} alt="Banga's Logo" id={styles.largeLogo} />
        <img src={smallLogo} alt="Banga's Logo" id={styles.smallLogo} />
      </a>
      <ul>
        <li>
          <a href="/">
            <i aria-label="Cart">
              <FontAwesomeIcon icon={faCartShopping} />
            </i>
          </a>
        </li>
        <li>
          <a href="/">
            <i aria-label="Profile">
              <FontAwesomeIcon icon={faUser} />
            </i>
          </a>
        </li>
      </ul>
    </nav>
  );
}
