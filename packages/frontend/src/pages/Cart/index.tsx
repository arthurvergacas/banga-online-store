import { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { Product } from '@banga/types/product';
import Spinner from 'components/Spinner';
import ProductCard from 'components/ProductCard';
import CartService from 'services/cartService';
import Button from 'components/Button';

export default function Cart() {
  const [products, setProducts] = useState<Product[]>();
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setProductsLoading(true);
      setProducts(await CartService.getAll());
      setProductsLoading(false);
    };

    getProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Carrinho</h1>
      <div className={styles.gridContainer} style={{ gridTemplateColumns: productsLoading ? '1fr' : undefined }}>
        {productsLoading ? <Spinner /> : products?.map((product) => <ProductCard product={product} key={product.id} />)}
      </div>

      <Button>Finalizar Compra</Button>
    </div>
  );
}
