import mongoose from 'mongoose';

const interviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    role: {
      type: String,
      required: true,
    },
    history: [
      {
        question: String,
        userAnswer: String,
        evaluation: {
          score: Number,
          mistakes: [String],
          idealAnswer: String,
        },
      },
    ],
    overallConfidenceScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;
