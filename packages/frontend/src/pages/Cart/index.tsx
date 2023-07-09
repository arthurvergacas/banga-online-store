import { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { ProductCart } from '@banga/types/product';
import { ProductPurchase } from '@banga/types/purchase';
import Spinner from 'components/Spinner';
import CartService from 'services/cartService';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import CartProductCard from './components/CartProductCard';

export default function Cart() {
  const [products, setProducts] = useState<ProductCart[]>();
  const [productsLoading, setProductsLoading] = useState(true);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [purchaseItens, setPurchaseItens] = useState<ProductPurchase[]>([]);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  const calculateTotal = () => {
    setPrice(
      products?.reduce((total, product, index) => {
        const price = product.price * purchaseItens[index].quantity;

        return price + total;
      }, 0) || 0
    );
  };

  const updatePurchaseItem = (productId: ProductCart['_id'], quantity: number) => {
    const index = purchaseItens?.findIndex((item) => item.productId === productId);

    if (index !== -1)
      setPurchaseItens((prev) => {
        prev[index] = { productId, quantity };
        return prev;
      });
    else setPurchaseItens((prev) => [...prev, { productId, quantity }]);

    calculateTotal();
  };

  useEffect(() => {
    const getProducts = async () => {
      setProductsLoading(true);

      const productsInCart = CartService.getAll();

      setProducts(productsInCart);
      productsInCart.forEach((product) =>
        setPurchaseItens((prev) => [...prev, { productId: product._id, quantity: 1 }])
      );

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
              onQuantityChange={(quantity) => updatePurchaseItem(product._id, quantity)}
            />
          ))
        )}
      </div>

      {!productsLoading && (
        <span className={styles.totalPrice}>
          <b>Total:</b> R$ {price.toLocaleString()}
        </span>
      )}

      <Button onClick={() => navigate('/payment')}>Ir para o pagamento</Button>
    </div>
  );
}
