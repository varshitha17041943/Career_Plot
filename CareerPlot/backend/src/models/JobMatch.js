import mongoose from 'mongoose';

const jobMatchSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Resume',
    },
    jobRole: {
      type: String,
      required: true,
    },
    matchPercentage: {
      type: Number,
      required: true,
    },
    missingSkills: [String],
    recommendedCertifications: [String],
    recommendedProjects: [String],
    suggestedTechnologies: [String],
    hiringProbability: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
    },
  },
  {
    timestamps: true,
  }
);

const JobMatch = mongoose.model('JobMatch', jobMatchSchema);

export default JobMatch;
