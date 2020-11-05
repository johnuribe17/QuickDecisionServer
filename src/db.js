const mongoose = require('mongoose');

function db() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/quickdecision';

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  mongoose.connect(uri, options);
  const {connection} = mongoose
  connection.once('open', () => console.log('Connection established successfully'));
  connection.on('error', err => console.log('Something went wrong!', err));
}

module.exports = db;