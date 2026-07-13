import mongoose from 'mongoose';

const roadmapSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    jobRole: {
      type: String,
      required: true,
    },
    durationDays: {
      type: Number,
      default: 30,
    },
    weeks: [
      {
        weekNumber: Number,
        focusArea: String,
        tasks: [
          {
            taskName: String,
            category: {
              type: String,
              enum: ['DSA', 'Projects', 'Development', 'Interview', 'Soft Skills', 'Aptitude', 'System Design'],
            },
            completed: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Roadmap = mongoose.model('Roadmap', roadmapSchema);

export default Roadmap;
