import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB: ${mongoUri}`);
  } catch (error) {
    console.warn('MongoDB connection failed. Continuing without DB connection.');
    console.warn(error);
  }

  app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
  });
};

void startServer();
