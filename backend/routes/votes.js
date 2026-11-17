const express = require('express');
const router = express.Router();
const { getVotes, castVote, getVoteStats } = require('../controllers/voteController');

// Order matters: /stats must come before /:id style routes
router.get('/stats', getVoteStats);
router.get('/', getVotes);
router.post('/', castVote);

module.exports = router;
