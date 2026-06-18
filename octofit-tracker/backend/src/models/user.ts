import { Schema, model, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 13 },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    goals: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export const User = model('User', userSchema);
