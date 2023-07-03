import express from 'express';
import mongoose from 'mongoose';

import Product from './models/product';
import User from './models/user';
import Payment from './models/payment';
import Login from './models/login';
import Cart from './models/cart';

import CredentialsManager from './services/credentials-manager';
import { randomUUID } from 'crypto';

const app = express();
app.use(express.json());

// Connecting to MongoDB
mongoose.connect('mongodb+srv://beni:asddsa123@banga-store.ezeunly.mongodb.net/banga-store?retryWrites=true&w=majority')
  .then(() => { console.log('Connected to MongoDB') })
  .catch((error) => { console.error('Error connecting to MongoDB:', error) });

// Products ------

// Fetch all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) { res.status(500).json({error: 'Error fetching products'}); }
});

// Fetch product by product ID
app.get('/products/:id', async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findOne({'id': productID});
    if (product) res.json(product);
    else res.status(404).json({error: 'Product not found'});
  } catch (error) { res.status(500).json({error: 'Error fetching product'}); }
});

// Register new product
app.post('/products', async (req, res) => {
  try {
    const productPayload = req.body;
    productPayload.id = randomUUID();
    const product = new Product(productPayload);
    const savedProduct = await product.save();
    console.log("saved the thing!!!!");
    res.status(201).json(savedProduct);
  } catch (error) { res.status(500).json({error: 'Error creating product'}); }
});

// Edit product by product ID
app.put('/products/:id', async (req, res) => {
  try {
    const productID = req.params.id;
    const updatePayload = req.body;
    delete updatePayload['id'];
    const product = await Product.findOneAndUpdate({'id': productID}, updatePayload, {new: true});
    if (product) res.json(product);
    else res.status(404).json({error: 'Product not found'});
  } catch (error) { res.status(500).json({error: 'Error updating product'}); }
});

// Delete product by product ID
app.delete('/products/:id', async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findOneAndDelete({'id': productID});
    if (product) res.sendStatus(204);
    else res.status(404).json({error: 'Product not found'});
  } catch (error) { res.status(500).json({error: 'Error deleting product'}); }
});

// User Profile ------

// Fetch all users' profiles
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) { res.status(500).json({error: 'Error fetching users'}); }
});

// Fetch user profile by user ID
app.get('/users/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await User.findOne({'id': userID});
    if (user) res.json(user);
    else res.status(404).json({error: 'User not found'});
  } catch (error) { res.status(500).json({error: 'Error fetching user'}); }
});

// Create new user
app.post('/users', async (req, res) => {
  try {
    const userPayload = req.body;
    userPayload.id = randomUUID();
    const user = new User(userPayload);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) { res.status(500).json({error: 'Error creating user'}); }
});

// Edit user's profile by user ID
app.put('/users/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const updatePayload = req.body;
    delete updatePayload['id'];
    const user = await User.findOneAndUpdate({'id': userID}, updatePayload, {new: true});
    if (user) res.json(user);
    else res.status(404).json({error: 'User not found'});
  } catch (error) { res.status(500).json({error: 'Error updating user'}); }
});

// Delete a user by user ID
app.delete('/users/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await User.findOneAndDelete({'id': userID});
    if (user) res.sendStatus(204);
    else res.status(404).json({error: 'User not found'});
  } catch (error) { res.status(500).json({error: 'Error deleting user'}); }
});

// User Payment Details ------

// Fetch a user's payment details by user ID
app.get('/payments/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const payment = await Payment.findOne({userID});
    if (payment) res.json(payment);
    else res.status(404).json({error: 'Payment data not found'});
  } catch (error) { res.status(500).json({error: 'Error fetching payment data'}); }
});

// Add payment details to already existing user by user ID
app.post('/payments/', async (req, res) => {
  try {
    const paymentDetailsPayload = req.body;
    paymentDetailsPayload.userID = randomUUID();
    const payment = new Payment(paymentDetailsPayload);
    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (error) { res.status(500).json({error: 'Error creating payment data',
                                          "msg": error}); }
});

// Edit a user's payment details
app.put('/payments/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const payment = await Payment.findOneAndUpdate({userID}, req.body, {new: true});
    if (payment) res.json(payment);
    else res.status(404).json({error: 'Payment data not found'});
  } catch (error) { res.status(500).json({error: 'Error updating payment data'}); }
});

// Delete a user's payment details by user ID
app.delete('/payments/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const payment = await Payment.findOneAndDelete({userID});
    if (payment) res.sendStatus(204);
    else res.status(404).json({error: 'Payment data not found'});
  } catch (error) { res.status(500).json({error: 'Error deleting payment data'}); }
});

// User Credentials ------

// Fetch user's credentials by email
app.get('/credentials/:email', async (req, res) => {
  try {
    const credentials = await Login.findOne({'email': req.params.email});
    if (credentials) res.json(credentials);
    else res.status(404).json({error: 'Credentials not found'});
  } catch (error) { res.status(500).json({error: 'Error fetching credentials'}); }
});

// Create user's credentials
app.post('/credentials', async (req, res) => {
  try {
    const credentials = new Login(req.body);
    credentials.password = CredentialsManager.encryptPassword(credentials.password);
    const savedLogin = await credentials.save();
    res.status(201).json(savedLogin);
  } catch (error) { res.status(500).json({error: 'Error creating credentials'}); }
});

// Remove user's credentials by user ID
app.delete('/credentials/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const login = await Login.findOneAndDelete({userID});
    if (login) res.sendStatus(204);
    else res.status(404).json({error: 'Credentials not found'});
  } catch (error) { res.status(500).json({error: 'Error deleting credentials'}); }
});

// User Carts ------

// Fetch user's cart status by user ID
app.get('/carts/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const cart = await Cart.findOne({userID});
    if (cart) res.json(cart);
    else res.status(404).json({error: 'Cart not found'});
  } catch (error) { res.status(500).json({error: 'Error fetching cart'}); }
});

// Create cart for already existing user by user ID
app.post('/carts/:id', async (req, res) => {
  try {
    const cartPayload = req.body;
    cartPayload.userID = req.params.id;
    const cart = new Cart(cartPayload);
    const savedCart = await cart.save();
    res.status(201).json(savedCart);
  } catch (error) { res.status(500).json({error: 'Error creating cart', "msg": error}); }
});

// Update user's cart by user ID
app.put('/carts/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const cart = await Cart.findOneAndUpdate({userID}, req.body, {new: true});
    if (cart) res.json(cart);
    else res.status(404).json({error: 'Cart not found'});
  } catch (error) { res.status(500).json({error: 'Error updating cart'}); }
});

// Delete user's cart by user ID
app.delete('/carts/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const cart = await Cart.findOneAndDelete({userID});
    if (cart) res.sendStatus(204);
    else res.status(404).json({error: 'Cart not found'});
  } catch (error) { res.status(500).json({error: 'Error deleting cart'}); }
});

app.listen(3000, () => {console.log('Server started on port 3000');});
