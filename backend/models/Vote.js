const mongoose = require('mongoose');

const MOVIES = ['Boshpana', 'Odisseya', 'Interstellar', 'The Dark Knight'];

const voteSchema = new mongoose.Schema(
  {
    voterName: {
      type: String,
      required: [true, 'Voter name is required'],
      trim: true,
    },
    movie: {
      type: String,
      required: [true, 'Movie selection is required'],
      enum: {
        values: MOVIES,
        message: `Movie must be one of: ${MOVIES.join(', ')}`,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vote', voteSchema);
