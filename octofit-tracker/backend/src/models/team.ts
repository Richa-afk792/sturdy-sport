import { Schema, model, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    score: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;
export const Team = model('Team', teamSchema);
