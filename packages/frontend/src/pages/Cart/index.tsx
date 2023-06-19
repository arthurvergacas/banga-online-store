import { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { Product } from '@banga/types/product';
import Spinner from 'components/Spinner';
import CartService from 'services/cartService';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import CartProductCard from './components/CartProductCard';

export default function Cart() {
  const [products, setProducts] = useState<Product[]>();
  const [productsLoading, setProductsLoading] = useState(true);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  const navigate = useNavigate();

  const calculateTotal = () => {
    return products?.reduce((total, product) => product.price + total, 0);
  };

  useEffect(() => {
    const getProducts = async () => {
      setProductsLoading(true);
      setProducts(await CartService.getAll());
      setProductsLoading(false);
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getProductsWithoutLoading = async () => {
      setProducts(await CartService.getAll());

      setShouldUpdate(false);
    };

    if (shouldUpdate) getProductsWithoutLoading();
  }, [shouldUpdate]);

  return (
    <div className={styles.container}>
      <h1>Carrinho</h1>

      <div className="grid" style={{ gridTemplateColumns: productsLoading ? '1fr' : undefined }}>
        {productsLoading ? (
          <Spinner width="30%" height="30%" />
        ) : (
          products?.map((product) => (
            <CartProductCard product={product} key={product.id} onRemove={() => setShouldUpdate(true)} />
          ))
        )}
      </div>

      {calculateTotal() && (
        <span className={styles.totalPrice}>
          <b>Total:</b> R$ {calculateTotal()?.toLocaleString()}
        </span>
      )}

      <Button onClick={() => navigate('/payment')}>Ir para o pagamento</Button>
    </div>
  );
}
