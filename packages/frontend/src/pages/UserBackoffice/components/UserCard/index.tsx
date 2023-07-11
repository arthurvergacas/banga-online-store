import { Link } from 'react-router-dom';
import styles from './UserCard.module.css';
import { User } from '@banga/types/user';

interface UserProps {
  user: User;
}

export default function UserCard({ user }: UserProps) {
  return (
    <Link to={user._id} className={styles.userCard}>
      <header>
        <h3>{user.name}</h3>
        <h4>{user.email}</h4>
      </header>

      {user.isAdmin && <span>ADM</span>}
    </Link>
  );
}
