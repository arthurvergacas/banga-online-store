import Spinner from 'components/Spinner';
import styles from './ProductBackoffice.module.css';
import { useEffect, useState } from 'react';
import { Product } from '@banga/types/product';
import ProductService from 'services/productService';
import ProductCard from 'components/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button';

export default function ProductBackoffice() {
  const [products, setProducts] = useState<Product[]>();
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setProductsLoading(true);
      setProducts(await ProductService.getAll());
      setProductsLoading(false);
    };

    getProducts();
  }, []);

  return (
    <div className={styles.container}>
      <Button className={styles.addBtn}>
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
      </Button>

      <h1>Produtos</h1>

      <div className="grid" style={{ gridTemplateColumns: productsLoading ? '1fr' : undefined }}>
        {productsLoading ? (
          <Spinner width="30%" height="30%" />
        ) : (
          products?.map((product) => <ProductCard to={`${product.id}`} product={product} key={product.id} />)
        )}
      </div>
    </div>
  );
}
