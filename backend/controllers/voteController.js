const Vote = require('../models/Vote');

const MOVIES = ['Boshpana', 'Odisseya', 'Interstellar', 'The Dark Knight'];

// @desc    Get all votes
// @route   GET /api/votes
// @access  Public
const getVotes = async (req, res) => {
  try {
    const votes = await Vote.find().sort({ createdAt: -1 });

    // Build stats alongside
    const stats = {};
    MOVIES.forEach((m) => (stats[m] = 0));
    votes.forEach((v) => {
      if (stats[v.movie] !== undefined) stats[v.movie]++;
    });

    res.json({ count: votes.length, votes, stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cast a vote
// @route   POST /api/votes
// @access  Public (one vote per voterName)
const castVote = async (req, res) => {
  try {
    const { voterName, movie } = req.body;

    if (!voterName || !movie) {
      return res.status(400).json({ message: 'voterName and movie are required' });
    }

    // Prevent duplicate votes by same person
    const existing = await Vote.findOne({ voterName: voterName.trim() });
    if (existing) {
      return res.status(400).json({ message: 'You have already voted' });
    }

    if (!MOVIES.includes(movie)) {
      return res.status(400).json({
        message: `Invalid movie. Choose from: ${MOVIES.join(', ')}`,
      });
    }

    const vote = await Vote.create({ voterName, movie });
    res.status(201).json(vote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vote stats per movie
// @route   GET /api/votes/stats
// @access  Public
const getVoteStats = async (req, res) => {
  try {
    const stats = await Vote.aggregate([
      { $group: { _id: '$movie', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Fill in zero-count movies
    const result = {};
    MOVIES.forEach((m) => (result[m] = 0));
    stats.forEach((s) => (result[s._id] = s.count));

    const total = Object.values(result).reduce((a, b) => a + b, 0);

    res.json({
      total,
      stats: Object.entries(result).map(([movie, count]) => ({
        movie,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVotes, castVote, getVoteStats };
