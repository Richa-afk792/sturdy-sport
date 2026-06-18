import mongoose from 'mongoose';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboardEntry';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const seed = async (): Promise<void> => {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      username: 'richa_runner',
      email: 'richa.runner@example.com',
      fullName: 'Richa Kapoor',
      age: 29,
      fitnessLevel: 'intermediate',
      goals: ['Run 10K under 55 minutes', 'Improve weekly endurance'],
    },
    {
      username: 'sam_strength',
      email: 'sam.strength@example.com',
      fullName: 'Sam Ortega',
      age: 34,
      fitnessLevel: 'advanced',
      goals: ['Increase squat max to 180kg', 'Reduce body fat by 2%'],
    },
    {
      username: 'nina_flow',
      email: 'nina.flow@example.com',
      fullName: 'Nina Brooks',
      age: 26,
      fitnessLevel: 'beginner',
      goals: ['Build consistency with 4 workouts/week', 'Improve mobility'],
    },
    {
      username: 'omar_cycle',
      email: 'omar.cycle@example.com',
      fullName: 'Omar Haddad',
      age: 31,
      fitnessLevel: 'intermediate',
      goals: ['Complete 120 km long ride', 'Boost VO2 max'],
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Pulse Pioneers',
      city: 'Austin',
      members: [users[0]._id, users[2]._id],
      score: 1340,
    },
    {
      name: 'Iron Octants',
      city: 'Seattle',
      members: [users[1]._id, users[3]._id],
      score: 1495,
    },
  ]);

  await Promise.all([
    User.findByIdAndUpdate(users[0]._id, { team: teams[0]._id }),
    User.findByIdAndUpdate(users[2]._id, { team: teams[0]._id }),
    User.findByIdAndUpdate(users[1]._id, { team: teams[1]._id }),
    User.findByIdAndUpdate(users[3]._id, { team: teams[1]._id }),
  ]);

  await Activity.insertMany([
    {
      user: users[0]._id,
      type: 'run',
      durationMinutes: 48,
      caloriesBurned: 530,
      distanceKm: 9.1,
      performedAt: new Date('2026-06-12T06:45:00Z'),
    },
    {
      user: users[1]._id,
      type: 'strength',
      durationMinutes: 62,
      caloriesBurned: 610,
      distanceKm: 0,
      performedAt: new Date('2026-06-13T17:20:00Z'),
    },
    {
      user: users[2]._id,
      type: 'yoga',
      durationMinutes: 35,
      caloriesBurned: 190,
      distanceKm: 0,
      performedAt: new Date('2026-06-13T07:15:00Z'),
    },
    {
      user: users[3]._id,
      type: 'cycle',
      durationMinutes: 95,
      caloriesBurned: 900,
      distanceKm: 41.3,
      performedAt: new Date('2026-06-14T05:30:00Z'),
    },
    {
      user: users[0]._id,
      type: 'hiit',
      durationMinutes: 28,
      caloriesBurned: 340,
      distanceKm: 0,
      performedAt: new Date('2026-06-15T18:05:00Z'),
    },
    {
      user: users[1]._id,
      type: 'swim',
      durationMinutes: 40,
      caloriesBurned: 420,
      distanceKm: 1.6,
      performedAt: new Date('2026-06-16T12:00:00Z'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    {
      user: users[1]._id,
      points: 980,
      rank: 1,
      weekStart: new Date('2026-06-15T00:00:00Z'),
    },
    {
      user: users[3]._id,
      points: 920,
      rank: 2,
      weekStart: new Date('2026-06-15T00:00:00Z'),
    },
    {
      user: users[0]._id,
      points: 870,
      rank: 3,
      weekStart: new Date('2026-06-15T00:00:00Z'),
    },
    {
      user: users[2]._id,
      points: 790,
      rank: 4,
      weekStart: new Date('2026-06-15T00:00:00Z'),
    },
  ]);

  await Workout.insertMany([
    {
      title: 'Tempo Run Builder',
      level: 'intermediate',
      durationMinutes: 45,
      focusAreas: ['endurance', 'pace control'],
      suggestedFor: [users[0]._id, users[3]._id],
    },
    {
      title: 'Power Lifting Progression',
      level: 'advanced',
      durationMinutes: 60,
      focusAreas: ['strength', 'compound lifts'],
      suggestedFor: [users[1]._id],
    },
    {
      title: 'Mobility Reset Flow',
      level: 'beginner',
      durationMinutes: 30,
      focusAreas: ['mobility', 'recovery'],
      suggestedFor: [users[2]._id, users[0]._id],
    },
    {
      title: 'Weekend Long Ride Prep',
      level: 'intermediate',
      durationMinutes: 75,
      focusAreas: ['aerobic base', 'cycling cadence'],
      suggestedFor: [users[3]._id],
    },
  ]);

  const [userCount, teamCount, activityCount, leaderboardCount, workoutCount] = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Activity.countDocuments(),
    LeaderboardEntry.countDocuments(),
    Workout.countDocuments(),
  ]);

  console.log(
    `Seed complete: users=${userCount}, teams=${teamCount}, activities=${activityCount}, leaderboard=${leaderboardCount}, workouts=${workoutCount}`
  );

  await mongoose.disconnect();
};

seed().catch(async (error) => {
  console.error('Seeding failed.');
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
