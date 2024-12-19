import mongoose from 'mongoose';

const TournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  league: { 
    type: String, 
    required: true,
    enum: ['business', 'junior', 'longday', 'fundraiser'] 
  },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  maxParticipants: { type: Number, required: true },
  description: { type: String, required: true },
  registeredPlayers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration'
  }],
  status: {
    type: String,
    enum: ['upcoming', 'in-progress', 'completed'],
    default: 'upcoming'
  },
  teeSheets: [{
    time: String,
    players: [String]
  }],
  leaderboard: [{
    position: Number,
    playerName: String,
    scores: [Number],
    total: Number,
    handicap: Number,
    netScore: Number
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Tournament', TournamentSchema);