import { Link } from 'react-router-dom';

import styles from './Home.module.css';
import { useEffect, useState } from 'react';
import ProdutService from '../../services/productService';
import { Product } from '@banga/types/product';
import Spinner from '../../components/Spinner';

export default function Home() {
  const [products, setProducts] = useState<Product[]>();
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setProductsLoading(true);
      setProducts(await ProdutService.getAll());
      setProductsLoading(false);
    };

    getProducts();
  }, []);

  return (
    <div className={styles.container} style={{ gridTemplateColumns: productsLoading ? '1fr' : undefined }}>
      {productsLoading ? (
        <Spinner />
      ) : (
        products?.map((product) => (
          <Link to={`product/${product.id}`} className={styles.productCardLink} key={product.id}>
            <div className={styles.productCard}>
              <header>
                <div>
                  <h3>{product.title}</h3>
                  <h4>{product.subtitle}</h4>
                </div>

                <strong>{product.price}</strong>
              </header>

              <img
                src={product.imageUrl}
                alt={product.title}
                className={styles.productImage}
                onLoad={() => console.log(product.id)}
              />
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
