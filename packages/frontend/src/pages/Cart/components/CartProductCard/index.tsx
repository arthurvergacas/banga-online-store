import { Product } from '@banga/types/product';
import { Link } from 'react-router-dom';

import styles from './CartProductCard.module.css';
import Image from 'components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import CartService from 'services/cartService';
import { useState } from 'react';
import Spinner from 'components/Spinner';

export interface CartProductCardProps {
  product: Product;
  to?: string;

  onRemove: () => void;
}

export default function CartProductCard({ product, to, onRemove }: CartProductCardProps) {
  const [removing, setRemoving] = useState(false);

  const removeFromCart = async () => {
    setRemoving(true);
    await CartService.removeFromCart(product.id);

    onRemove();
  };

  return (
    <Link to={to ?? `/product/${product.id}`} className={styles.productCardLink}>
      <div className={styles.productCard}>
        <header>
          <div>
            <h3>{product.title}</h3>
            <h4>{product.subtitle}</h4>
          </div>

          <strong>R$ {product.price.toLocaleString()}</strong>
        </header>

        <Image
          src={product.imageUrl}
          alt={product.title}
          spinnerClassName={styles.productImageSpinnerContainer}
          imgClassName={styles.productImage}
        />

        <footer>
          <button
            className={styles.removeProductButton}
            onClick={(event) => {
              event.preventDefault();
              removeFromCart();
            }}
          >
            {removing ? (
              <Spinner height="1em" width="1em" />
            ) : (
              <i aria-label="Remover produto">
                <FontAwesomeIcon icon={faTrash} />
              </i>
            )}
          </button>
        </footer>
      </div>
    </Link>
  );
}
