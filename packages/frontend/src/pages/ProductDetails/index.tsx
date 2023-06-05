import Image from 'components/Image';

import styles from './Product.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from 'services/productService';
import { Product } from '@banga/types/product';
import Spinner from 'components/Spinner';
import PlayInstrument from './components/PlayInstrument';

export default function ProductDetails() {
  const [product, setProduct] = useState<Product>();
  const [productLoading, setProductLoading] = useState(true);

  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      if (productId && !product) {
        setProductLoading(true);
        const fetchedProduct = await ProductService.getById(productId);

        if (fetchedProduct == null) navigate('/');

        setProduct(await ProductService.getById(productId));
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
        <Spinner size="5em" />
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

        <PlayInstrument />
      </div>

      <section id={styles.productContent}>
        <div>
          <p id={styles.productDescription}>{product?.description}</p>

          <div id={styles.productBuyButtonContainer}>
            <strong>R$ {product?.price}</strong>
            <button type="button">COMPRAR</button>
          </div>
        </div>

        <div id={styles.imgContainer}>
          <Image src={product!.imageUrl} alt={product!.title} spinnerClassName={styles.spinnerContainer} />
        </div>
      </section>
    </div>
  );
}
