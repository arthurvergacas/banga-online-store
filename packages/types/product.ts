export interface Product {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  audioUrl: string;
}

export interface ProductCart extends Product {
  quantity: number;
}

export interface ProductRequest extends Omit<Product, 'imageUrl' | 'audioUrl'> {
  image: FileList;
  audio: FileList;
}
