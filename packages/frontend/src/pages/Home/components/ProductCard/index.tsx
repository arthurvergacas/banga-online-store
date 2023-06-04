import { Product } from '@banga/types/product';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import styles from './ProductCard.module.css';
import Spinner from '../../../../components/Spinner';

export interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Link to={`product/${product.id}`} className={styles.productCardLink}>
      <div className={styles.productCard}>
        <header>
          <div>
            <h3>{product.title}</h3>
            <h4>{product.subtitle}</h4>
          </div>

          <strong>{product.price}</strong>
        </header>

        {imageLoading && (
          <div className={styles.productImageSpinnerContainer}>
            <Spinner />
          </div>
        )}

        <img
          src={product.imageUrl}
          alt={product.title}
          className={styles.productImage}
          style={{ display: imageLoading ? 'none' : 'block' }}
          onLoad={() => setImageLoading(false)}
        />
      </div>
    </Link>
  );
}
