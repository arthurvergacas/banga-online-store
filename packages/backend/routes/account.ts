import express from 'express';
import cors from 'cors';

import User from '../models/user';
import Login from '../models/login';

import { guardedRoute } from '../middlewares/authGuard';

var router = express.Router();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

// Fetch all users' profiles
router.get('/users', guardedRoute({ adminOnly: true }), async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  });

// Fetch user profile by user ID
router.get('/users/:id', guardedRoute({ adminOnly: true }), async (req, res) => {
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
router.post('/users', guardedRoute({ adminOnly: true }), async (req, res) => {
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
router.put('/users/:id', guardedRoute({ adminOnly: true }), async (req, res) => {
  try {
    const userID = req.params.id;
    const updatePayload = req.body;
    const user = await User.findByIdAndUpdate(userID, updatePayload, { new: true });
    if (user) {
      if (updatePayload.email)
        await Login.findOneAndUpdate({ userID }, {'email': updatePayload.email}, { new: true })
      res.json(user);
    } else res.status(404).json({ error: 'User not found' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete a user by user ID
router.delete('/users/:id', guardedRoute({ adminOnly: true }), async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await User.findByIdAndDelete(userID);
    if (user) res.sendStatus(204);
    else res.status(404).json({ error: 'User not found' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

export default router;
