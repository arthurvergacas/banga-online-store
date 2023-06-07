import Image from 'components/Image';

import styles from './ProductDetails.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from 'services/productService';
import { Product } from '@banga/types/product';
import Spinner from 'components/Spinner';
import PlayInstrument from './components/PlayInstrument';
import Button from 'components/Button';
import CartService from 'services/cartService';

export default function ProductDetails() {
  const [product, setProduct] = useState<Product>();
  const [productLoading, setProductLoading] = useState(true);
  const [addingProductToCart, setAddingProductToCart] = useState(false);

  const { productId } = useParams();
  const navigate = useNavigate();

  const addToCart = async () => {
    if (!product) return;

    setAddingProductToCart(true);
    await CartService.addToCart(product);
    setAddingProductToCart(false);

    navigate('/cart');
  };

  useEffect(() => {
    const getProduct = async () => {
      if (productId && !product) {
        setProductLoading(true);
        const fetchedProduct = await ProductService.getById(productId);

        if (fetchedProduct == null) navigate('/');

        setProduct(fetchedProduct);
        setProductLoading(false);
      }
    };

    getProduct();
  }, [productId, product, navigate]);

  if (productLoading) {
    return (
      <div
        className={styles.container}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <Spinner width="5em" height="5em" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div id={styles.productHeader}>
        <header>
          <h1>{product?.title}</h1>
          <h2>{product?.subtitle}</h2>
        </header>

        <PlayInstrument audioUrl={product!.audioUrl} />
      </div>

      <section id={styles.productContent}>
        <div>
          <p id={styles.productDescription}>{product?.description}</p>

          <div id={styles.productBuyButtonContainer}>
            <strong>R$ {product?.price.toLocaleString()}</strong>
            <Button onClick={addToCart} disabled={addingProductToCart}>
              {addingProductToCart ? <Spinner width="10%" height="none" /> : <>ADICIONAR AO CARRINHO</>}
            </Button>
          </div>
        </div>

        <div id={styles.imgContainer}>
          <Image src={product!.imageUrl} alt={product!.title} spinnerClassName={styles.spinnerContainer} />
        </div>
      </section>
    </div>
  );
}
