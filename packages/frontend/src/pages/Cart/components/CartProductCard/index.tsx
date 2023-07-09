import { ProductCart } from '@banga/types/product';
import { Link } from 'react-router-dom';

import styles from './CartProductCard.module.css';
import Image from 'components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import CartService from 'services/cartService';
import { useEffect, useState } from 'react';
import Spinner from 'components/Spinner';

export interface CartProductCardProps {
  product: ProductCart;
  to?: string;

  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
}

export default function CartProductCard({
  product,
  to,
  onRemove,
  onQuantityChange,
}: CartProductCardProps) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [removing, setRemoving] = useState(false);

  const removeFromCart = async () => {
    setRemoving(true);
    CartService.removeFromCart(product._id);

    onRemove();
  };

  useEffect(() => onQuantityChange(quantity), [onQuantityChange, quantity]);

  return (
    <Link to={to ?? `/product/${product._id}`} className={styles.productCardLink}>
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
          <div
            className={styles.quantityInputContainer}
            onClick={(event) => event.preventDefault()}
          >
            <label htmlFor="quantity">Quantidade</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={(event) =>
                setQuantity((prev) => {
                  const newQuantity = parseInt(event.target.value || prev.toString());
                  return newQuantity > 0 ? newQuantity : prev;
                })
              }
              onClick={(event) => (event.target as HTMLInputElement).select()}
            />
          </div>

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
