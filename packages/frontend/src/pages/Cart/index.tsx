import { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { ProductCart } from '@banga/types/product';
import Spinner from 'components/Spinner';
import CartService from 'services/cartService';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import CartProductCard from './components/CartProductCard';

export default function Cart() {
  const [products, setProducts] = useState<ProductCart[]>();
  const [productsLoading, setProductsLoading] = useState(true);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [totalPrice, setTotalPrice] = useState(CartService.getTotalPrice());

  const navigate = useNavigate();

  const updateProductQuantity = (productId: ProductCart['_id'], quantity: number): void => {
    CartService.updateProductQuantity(productId, quantity);

    setTotalPrice(CartService.getTotalPrice());
  };

  useEffect(() => {
    const getProducts = async () => {
      setProductsLoading(true);
      setProducts(CartService.getAll());
      setProductsLoading(false);
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getProductsWithoutLoading = async () => {
      setProducts(CartService.getAll());

      setShouldUpdate(false);
    };

    if (shouldUpdate) getProductsWithoutLoading();
  }, [shouldUpdate]);

  if (products?.length === 0) {
    return (
      <div className={styles.container}>
        <h1>Carrinho</h1>

        <p className="noItemsMessage">Sem produtos no carrinho.</p>

        <Button onClick={() => navigate('/')}>Voltar para a página inicial.</Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Carrinho</h1>

      <div className="grid" style={{ gridTemplateColumns: productsLoading ? '1fr' : undefined }}>
        {productsLoading ? (
          <Spinner width="30%" height="30%" />
        ) : (
          products?.map((product) => (
            <CartProductCard
              product={product}
              key={product._id}
              onRemove={() => setShouldUpdate(true)}
              onQuantityChange={(quantity) => updateProductQuantity(product._id, quantity)}
            />
          ))
        )}
      </div>

      {!productsLoading && (
        <span className={styles.totalPrice}>
          <b>Total:</b> R$ {totalPrice.toLocaleString()}
        </span>
      )}

      <Button onClick={() => navigate('/payment')}>Ir para o pagamento</Button>
    </div>
  );
}
