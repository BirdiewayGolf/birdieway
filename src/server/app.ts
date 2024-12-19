import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Tournament from './models/Tournament.js';
import Registration from './models/Registration.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Auth Middleware
const authenticateAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Public Routes
app.get('/api/tournaments', async (req, res) => {
  try {
    const { league } = req.query;
    const query = league ? { league } : {};
    const tournaments = await Tournament.find(query)
      .sort({ date: 1 })
      .select('-leaderboard');
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tournaments' });
  }
});

app.get('/api/tournaments/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate('registeredPlayers', 'playerName');
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    res.json(tournament);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tournament details' });
  }
});

// Admin Routes
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET!, { expiresIn: '24h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/admin/tournaments', authenticateAdmin, async (req, res) => {
  try {
    const tournament = await Tournament.create(req.body);
    res.status(201).json(tournament);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create tournament' });
  }
});

app.put('/api/admin/tournaments/:id', authenticateAdmin, async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    res.json(tournament);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update tournament' });
  }
});

app.post('/api/admin/tournaments/:id/teetimes', authenticateAdmin, async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    tournament.teeSheets = req.body.teeSheets;
    await tournament.save();
    res.json(tournament);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update tee times' });
  }
});

app.post('/api/admin/tournaments/:id/leaderboard', authenticateAdmin, async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    tournament.leaderboard = req.body.leaderboard;
    await tournament.save();
    res.json(tournament);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update leaderboard' });
  }
});

// Registration Routes
app.post('/api/tournaments/:id/register', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    if (tournament.registeredPlayers.length >= tournament.maxParticipants) {
      return res.status(400).json({ error: 'Tournament is full' });
    }

    const registration = await Registration.create({
      tournament: tournament._id,
      ...req.body
    });

    tournament.registeredPlayers.push(registration._id);
    await tournament.save();

    res.status(201).json(registration);
  } catch (err) {
    res.status(400).json({ error: 'Failed to register for tournament' });
  }
});

// Error Handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;