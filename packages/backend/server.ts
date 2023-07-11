import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import ProductRouter from './routes/product';
import AccountRouter from './routes/account';
import UserJourneyRouter from './routes/user-journey';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use(ProductRouter);
app.use(AccountRouter);
app.use(UserJourneyRouter);

// Connecting to MongoDB
mongoose
  .connect('mongodb+srv://beni:asddsa123@banga-store.ezeunly.mongodb.net/banga-store?retryWrites=true&w=majority')
  .then(() => { console.log('Connected to MongoDB'); })
  .catch((error) => { console.error('Error connecting to MongoDB:', error); });

app.listen(8000, () => { console.log('Server started on port 8000'); });
