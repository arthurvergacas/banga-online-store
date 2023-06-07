import { Product } from '@banga/types/product';
import { Link } from 'react-router-dom';

import styles from './ProductCard.module.css';
import Image from 'components/Image';

export interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className={styles.productCardLink}>
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
      </div>
    </Link>
  );
}
