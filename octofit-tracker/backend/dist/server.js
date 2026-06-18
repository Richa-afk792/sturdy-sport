"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activity_1 = require("./models/activity");
const database_1 = require("./database");
const leaderboardEntry_1 = require("./models/leaderboardEntry");
const team_1 = require("./models/team");
const user_1 = require("./models/user");
const workout_1 = require("./models/workout");
const app = (0, express_1.default)();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
const handleRouteError = (res, error) => {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
};
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});
app.get('/api/users/', async (_req, res) => {
    try {
        const items = await user_1.User.find().populate('team', 'name city').lean();
        res.json({ resource: 'users', items, apiBaseUrl });
    }
    catch (error) {
        handleRouteError(res, error);
    }
});
app.get('/api/teams/', async (_req, res) => {
    try {
        const items = await team_1.Team.find().populate('members', 'username fullName').lean();
        res.json({ resource: 'teams', items, apiBaseUrl });
    }
    catch (error) {
        handleRouteError(res, error);
    }
});
app.get('/api/activities/', async (_req, res) => {
    try {
        const items = await activity_1.Activity.find()
            .populate('user', 'username fullName')
            .sort({ performedAt: -1 })
            .lean();
        res.json({ resource: 'activities', items, apiBaseUrl });
    }
    catch (error) {
        handleRouteError(res, error);
    }
});
app.get('/api/leaderboard/', async (_req, res) => {
    try {
        const items = await leaderboardEntry_1.LeaderboardEntry.find()
            .populate('user', 'username fullName')
            .sort({ rank: 1 })
            .lean();
        res.json({ resource: 'leaderboard', items, apiBaseUrl });
    }
    catch (error) {
        handleRouteError(res, error);
    }
});
app.get('/api/workouts/', async (_req, res) => {
    try {
        const items = await workout_1.Workout.find()
            .populate('suggestedFor', 'username fullName')
            .lean();
        res.json({ resource: 'workouts', items, apiBaseUrl });
    }
    catch (error) {
        handleRouteError(res, error);
    }
});
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        console.log(`Connected to MongoDB: ${database_1.mongoUri}`);
    }
    catch (error) {
        console.warn('MongoDB connection failed. Continuing without DB connection.');
        console.warn(error);
    }
    app.listen(port, () => {
        console.log(`OctoFit backend listening on port ${port}`);
        console.log(`API base URL: ${apiBaseUrl}`);
    });
};
void startServer();
