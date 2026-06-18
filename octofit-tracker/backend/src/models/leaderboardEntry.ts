import { Schema, model, type InferSchemaType } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    weekStart: { type: Date, required: true },
  },
  { timestamps: true }
);

export type LeaderboardEntryDocument = InferSchemaType<typeof leaderboardEntrySchema>;
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);
