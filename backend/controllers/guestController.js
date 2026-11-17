const Guest = require('../models/Guest');

// @desc    Get all guests
// @route   GET /api/guests
// @access  Public
const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find().sort({ createdAt: -1 });
    res.json({ count: guests.length, guests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new guest (accept invitation)
// @route   POST /api/guests
// @access  Public
const addGuest = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Guest name is required' });
    }

    // Check for duplicate name
    const existing = await Guest.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: 'A guest with this name has already confirmed' });
    }

    const guest = await Guest.create({ name, phone });
    res.status(201).json(guest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a guest
// @route   DELETE /api/guests/:id
// @access  Private (auth required)
const deleteGuest = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);

    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }

    await guest.deleteOne();
    res.json({ message: 'Guest removed', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getGuests, addGuest, deleteGuest };
