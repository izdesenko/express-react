import mongoose from 'mongoose';
const uri = 'mongodb://localhost/score';

mongoose.set('useCreateIndex', true);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', console.log.bind(console, 'MongoDB connected'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
