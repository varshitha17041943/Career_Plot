import mongoose from 'mongoose';

const resumeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    fileName: {
      type: String,
      required: true,
    },
    extractedText: {
      type: String,
      required: true,
    },
    analysis: {
      skills: [String],
      atsScore: Number,
      weakSections: [String],
      suggestions: [String],
      missingTechnologies: [String],
      recommendedProjects: [String],
      improvedSummary: String,
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
