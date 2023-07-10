import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import User from '../models/user';
import Payment from '../models/payment';
import Product from '../models/product';
import Login from '../models/login';

import CredentialsManager from '../services/credentialsManager';

import { PaymentRequest } from '@banga/types/payment';
import { guardedRoute } from '../middlewares/authGuard';
import { JWT_SECRET } from '../constants/authConstants';

var router = express.Router();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

// Add payment details to already existing user by user ID
router.post('/payments/', guardedRoute(), async (req, res) => {
    try {
      const paymentPayload: PaymentRequest = req.body;
      const payment = new Payment(paymentPayload);
      const savedPayment = await payment.save();
  
      paymentPayload.products.forEach(async (productBought) => {
        const product = await Product.findById(productBought._id);
        if (!product) return;
  
        product.stock -= productBought.quantity;
        product.save();
      });
  
      res.status(201).json(savedPayment);
    } catch (error) {
      res.status(500).json({ error: 'Error creating payment data', msg: error });
    }
  });
  
  // User Credentials ------
  
  // Sign in
  router.post('/signin', async (req, res) => {
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
      const token = jwt.sign({ userId: savedLogin.userID, userData: savedUser }, JWT_SECRET);
  
      res.status(200).json({
        token: token,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error creating account', msg: error });
    }
  });
  
  // Login
  router.post('/login', async (req, res) => {
    try {
      const credentials = await Login.findOne({ email: req.body.email });
      if (credentials == null) return res.status(401).json({ error: 'Unexisting user.' });
  
      const encryptedPassword = CredentialsManager.encryptPassword(req.body.password);
      if (credentials.password !== encryptedPassword)
        res.status(401).json({ error: 'Invalid credentials. Rectify provided data and try again.' });
  
      const user = await User.findById(credentials.userID);
  
      const token = jwt.sign({ userId: credentials.userID, userData: user }, JWT_SECRET);
  
      res.status(200).json({
        token,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error loging in', msg: error });
    }
  });

  export default router;
