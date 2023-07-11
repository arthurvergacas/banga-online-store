import express from 'express';
import cors from 'cors';

import Product from '../models/product';

import { guardedRoute } from '../middlewares/authGuard';
import { uploadToCloudinary } from '../file-upload/cloudinary';
import { upload } from '../file-upload/multer';


var router = express.Router();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

// Fetch all products
router.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  });
  
  // Fetch product by product ID
  router.get('/products/:id', async (req, res) => {
    try {
      const productID = req.params.id;
      const product = await Product.findById(productID);
      if (product) res.json(product);
      else res.status(404).json({ error: 'Product not found' });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching product' });
    }
  });
  
  // Register new product
  router.post(
    '/products',
    guardedRoute({ adminOnly: true }),
    upload.fields([{ name: 'image' }, { name: 'audio' }]),
    async (req, res) => {
      try {
        if (!req.files) return res.status(400).json({ error: 'Missing image and audio files' });
  
        const productPayload = req.body;
  
        const product = new Product({
          ...productPayload,
          imageUrl: 'temp',
          audioUrl: 'url',
        });
        product.validate();
  
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  
        const { url: imageUrl } = await uploadToCloudinary(files['image'][0]);
        const { url: audioUrl } = await uploadToCloudinary(files['audio'][0]);
  
        product.imageUrl = imageUrl;
        product.audioUrl = audioUrl;
        const savedProduct = await product.save();
  
        res.status(201).json(savedProduct);
      } catch (error) {
        res.status(500).json({ error: 'Error creating product', msg: error });
      }
    }
  );
  
  // Edit product by product ID
  router.put(
    '/products/:id',
    guardedRoute({ adminOnly: true }),
    upload.fields([{ name: 'image' }, { name: 'audio' }]),
    async (req, res) => {
      try {
        const productID = req.params.id;
        const updatePayload = req.body;
        delete updatePayload['id'];
  
        const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
  
        if (files) {
          if (files['image'] && files['image'][0]) {
            const { url: imageUrl } = await uploadToCloudinary(files['image'][0]);
            updatePayload.imageUrl = imageUrl;
          }
          if (files['audio'] && files['audio'][0]) {
            const { url: audioUrl } = await uploadToCloudinary(files['audio'][0]);
            updatePayload.audioUrl = audioUrl;
          }
        }
  
        const product = await Product.findByIdAndUpdate(productID, updatePayload, { new: true });
        if (product) res.json(product);
        else res.status(404).json({ error: 'Product not found' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating product' });
      }
    }
  );
  
  // Delete product by product ID
  router.delete('/products/:id', guardedRoute({ adminOnly: true }), async (req, res) => {
    try {
      const productID = req.params.id;
      const product = await Product.findByIdAndDelete(productID);
      if (product) res.sendStatus(204);
      else res.status(404).json({ error: 'Product not found' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting product' });
    }
  });


export default router;