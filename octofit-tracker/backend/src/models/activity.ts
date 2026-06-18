import { Schema, model, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'cycle', 'strength', 'yoga', 'swim', 'hiit'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0, default: 0 },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;
export const Activity = model('Activity', activitySchema);
