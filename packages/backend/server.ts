import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import Product from './models/product';
import User from './models/user';
import Payment from './models/payment';
import Login from './models/login';

import CredentialsManager from './services/credentialsManager';
import { JWT_SECRET } from './constants/authConstants';
import { guardedRoute } from './middlewares/authGuard';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

// Connecting to MongoDB
mongoose
  .connect(
    'mongodb+srv://beni:asddsa123@banga-store.ezeunly.mongodb.net/banga-store?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Products ------

// Fetch all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Fetch product by product ID
app.get('/products/:id', async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findOne({ id: productID });
    if (product) res.json(product);
    else res.status(404).json({ error: 'Product not found' });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
});

// Register new product
app.post('/products', async (req, res) => {
  try {
    const productPayload = req.body;
    const product = new Product(productPayload);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
});

// Edit product by product ID
app.put('/products/:id', async (req, res) => {
  try {
    const productID = req.params.id;
    const updatePayload = req.body;
    delete updatePayload['id'];
    const product = await Product.findByIdAndUpdate(productID, updatePayload, { new: true });
    if (product) res.json(product);
    else res.status(404).json({ error: 'Product not found' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
});

// Delete product by product ID
app.delete('/products/:id', async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findByIdAndDelete(productID);
    if (product) res.sendStatus(204);
    else res.status(404).json({ error: 'Product not found' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
});

// User Profile ------

// Fetch all users' profiles
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Fetch user profile by user ID
app.get('/users/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await User.findById(userID);
    if (user) res.json(user);
    else res.status(404).json({ error: 'User not found' });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// Create new user
app.post('/users', async (req, res) => {
  try {
    const userPayload = req.body;
    const user = new User(userPayload);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Edit user's profile by user ID
app.put('/users/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const updatePayload = req.body;
    delete updatePayload['id'];
    const user = await User.findByIdAndUpdate(userID, updatePayload, { new: true });
    if (user) res.json(user);
    else res.status(404).json({ error: 'User not found' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete a user by user ID
app.delete('/users/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await User.findByIdAndDelete(userID);
    if (user) res.sendStatus(204);
    else res.status(404).json({ error: 'User not found' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

// Payment ------

// Add payment details to already existing user by user ID
app.post('/payments/', async (req, res) => {
  try {
    const paymentDetailsPayload = req.body;
    const payment = new Payment(paymentDetailsPayload);
    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating payment data', msg: error });
  }
});

// User Credentials ------

// Sign in
app.post('/signin', async (req, res) => {
  try {
    const userPayload = req.body;
    userPayload.password = CredentialsManager.encryptPassword(userPayload.password);
    const user = new User(userPayload);
    const savedUser = await user.save();

    const credentials = new Login({
      email: savedUser.email,
      password: savedUser.password,
      userID: savedUser._id,
    });

    const savedLogin = await credentials.save();
    const token = jwt.sign(
      { userId: savedLogin.userID, email: savedLogin.email },
      'meudeuseuprecisodeferias'
    );

    res.status(200).json({
      success: true,
      data: { token: token },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating account', msg: error });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const credentials = await Login.findOne({ email: req.body.email });
    if (credentials == null) return res.status(401).json({ error: 'Unexisting user.' });

    const encryptedPassword = CredentialsManager.encryptPassword(req.body.password);
    if (credentials.password !== encryptedPassword)
      res.status(401).json({ error: 'Invalid credentials. Rectify provided data and try again.' });

    const token = jwt.sign({ userId: credentials.userID, email: credentials.email }, JWT_SECRET);

    res.status(200).json({
      success: true,
      data: { token: token },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error loging in', msg: error });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
