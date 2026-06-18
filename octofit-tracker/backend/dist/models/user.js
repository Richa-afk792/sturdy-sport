"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 13 },
    fitnessLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true,
    },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', default: null },
    goals: [{ type: String, trim: true }],
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
