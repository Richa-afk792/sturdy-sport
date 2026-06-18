"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.connectDatabase = exports.mongoUri = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const connectDatabase = async () => {
    if (mongoose_1.default.connection.readyState === 1) {
        return;
    }
    await mongoose_1.default.connect(exports.mongoUri);
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    if (mongoose_1.default.connection.readyState === 0) {
        return;
    }
    await mongoose_1.default.disconnect();
};
exports.disconnectDatabase = disconnectDatabase;
