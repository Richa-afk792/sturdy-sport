import express from 'express';
import { Activity } from './models/activity';
import { connectDatabase, mongoUri } from './database';
import { LeaderboardEntry } from './models/leaderboardEntry';
import { Team } from './models/team';
import { User } from './models/user';
import { Workout } from './models/workout';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

const handleRouteError = (res: express.Response, error: unknown): void => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
};

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});

app.get('/api/users/', async (_req, res) => {
  try {
    const items = await User.find().populate('team', 'name city').lean();
    res.json({ resource: 'users', items, apiBaseUrl });
  } catch (error) {
    handleRouteError(res, error);
  }
});

app.get('/api/teams/', async (_req, res) => {
  try {
    const items = await Team.find().populate('members', 'username fullName').lean();
    res.json({ resource: 'teams', items, apiBaseUrl });
  } catch (error) {
    handleRouteError(res, error);
  }
});

app.get('/api/activities/', async (_req, res) => {
  try {
    const items = await Activity.find()
      .populate('user', 'username fullName')
      .sort({ performedAt: -1 })
      .lean();
    res.json({ resource: 'activities', items, apiBaseUrl });
  } catch (error) {
    handleRouteError(res, error);
  }
});

app.get('/api/leaderboard/', async (_req, res) => {
  try {
    const items = await LeaderboardEntry.find()
      .populate('user', 'username fullName')
      .sort({ rank: 1 })
      .lean();
    res.json({ resource: 'leaderboard', items, apiBaseUrl });
  } catch (error) {
    handleRouteError(res, error);
  }
});

app.get('/api/workouts/', async (_req, res) => {
  try {
    const items = await Workout.find()
      .populate('suggestedFor', 'username fullName')
      .lean();
    res.json({ resource: 'workouts', items, apiBaseUrl });
  } catch (error) {
    handleRouteError(res, error);
  }
});

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    console.log(`Connected to MongoDB: ${mongoUri}`);
  } catch (error) {
    console.warn('MongoDB connection failed. Continuing without DB connection.');
    console.warn(error);
  }

  app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
};

void startServer();
