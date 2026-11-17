const express = require('express');
const router = express.Router();
const { getGuests, addGuest, deleteGuest } = require('../controllers/guestController');
const { protect } = require('../middleware/auth');

router.get('/', getGuests);
router.post('/', addGuest);
router.delete('/:id', protect, deleteGuest);

module.exports = router;
