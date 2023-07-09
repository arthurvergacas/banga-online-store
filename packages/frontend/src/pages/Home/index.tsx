import { useEffect, useState } from 'react';
import { Product } from '@banga/types/product';
import ProductService from 'services/productService';
import Spinner from 'components/Spinner';
import ProductCard from '../../components/ProductCard';

export default function Home() {
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
    <div className="grid" style={{ gridTemplateColumns: productsLoading ? '1fr' : undefined }}>
      {productsLoading ? (
        <Spinner width="30%" height="30%" />
      ) : (
        products?.map((product) => <ProductCard product={product} key={product._id} />)
      )}
    </div>
  );
}
