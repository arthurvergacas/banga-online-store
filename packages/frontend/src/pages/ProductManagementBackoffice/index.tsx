import { useEffect, useState } from 'react';
import styles from './ProductManagementBackoffice.module.css';
import { useForm } from 'react-hook-form';
import { Product, ProductRequest } from '@banga/types/product';
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from 'services/productService';
import Spinner from 'components/Spinner';
import Input from 'components/Input';
import Button from 'components/Button';
import UnderlinedButton from 'components/UnderlinedButton';

export default function ProductManagementBackoffice() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [productLoading, setProductLoading] = useState(true);
  const [savingProduct, setSavingProduct] = useState(false);

  const useFormProps = useForm<ProductRequest>({ mode: 'all' });

  const { productId } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data: ProductRequest) => {
    try {
      setSavingProduct(true);

      if (productId && productId !== 'new') await ProductService.save(productId, data);
      else await ProductService.createProduct(data);

      navigate('/admin/products');
      return;
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    } finally {
      setSavingProduct(false);
    }
  };

  const deleteProduct = async () => {
    try {
      setSavingProduct(true);

      await ProductService.delete(useFormProps.getValues()._id);

      navigate('/admin/products');
      return;
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    } finally {
      setSavingProduct(false);
    }
  };

  useEffect(() => {
    const populateFormWithProductData = (productData: Product) => {
      for (const key of Object.keys(productData) as (keyof Product)[]) {
        if (key !== 'imageUrl' && key !== 'audioUrl') {
          useFormProps.setValue(key, productData[key]);
        }
      }
    };

    const getProduct = async () => {
      if (productId) {
        setProductLoading(true);
        const fetchedProduct = await ProductService.getById(productId);

        if (fetchedProduct == null) {
          navigate('/admin/products');
          return;
        }

        populateFormWithProductData(fetchedProduct);
        setProductLoading(false);
      }
    };

    if (productId !== 'new') getProduct();
    else setProductLoading(false);
  }, [productId, navigate, useFormProps]);

  if (productLoading) {
    return (
      <div className={styles.container} style={{ height: '17em' }}>
        <Spinner width="5em" height="5em" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={useFormProps.handleSubmit(onSubmit)}>
        <h1>{productId === 'new' ? 'Cadastrar produto' : 'Editar produto'}</h1>

        <div className={styles.row}>
          <Input
            label="Instrumento"
            useFormProps={useFormProps}
            required={productId === 'new'}
            name="title"
            type="text"
            placeholder="ex.: Saxofone"
          />

          <Input
            label="Modelo"
            useFormProps={useFormProps}
            required={productId === 'new'}
            name="subtitle"
            type="text"
            placeholder="ex.: Eagle SA500vg"
          />
        </div>

        <div className={styles.row}>
          <Input
            label="Preço"
            useFormProps={useFormProps}
            required={productId === 'new'}
            name="price"
            type="number"
            step={0.01}
            placeholder="25,99"
          />

          <Input
            label="Descrição"
            useFormProps={useFormProps}
            required={productId === 'new'}
            name="description"
            type="text"
            placeholder="Descrição"
          />
        </div>

        <div className={styles.row}>
          <Input
            label="Imagem"
            useFormProps={useFormProps}
            required={productId === 'new'}
            name="image"
            type="file"
          />

          <Input
            label="Áudio"
            useFormProps={useFormProps}
            required={productId === 'new'}
            name="audio"
            type="file"
          />
        </div>

        <div className={styles.row} style={{ justifyContent: 'center' }}>
          <Input
            label="Estoque"
            useFormProps={useFormProps}
            required={productId === 'new'}
            name="stock"
            type="number"
            placeholder="XX"
          />
        </div>

        <Button type="submit" disabled={savingProduct} className={styles.saveButton}>
          {savingProduct ? <Spinner height="30px" /> : <>Salvar</>}
        </Button>

        {productId !== 'new' && (
          <UnderlinedButton className={styles.deleteButton} onClick={deleteProduct}>
            Deletar Produto
          </UnderlinedButton>
        )}

        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
      </form>
    </div>
  );
}
