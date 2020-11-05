require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./src/db');
const userRouter = require('./src/routes/user.route');
const { auth } = require('./src/utils/middlewares')

const port = process.env.PORT || 8000;

const app = express();
db();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/users', userRouter);

// app.get('/', auth, (req, res) => {
//   console.log(req.user);
//   User.findById(req.user);
//   res.status(200).send('hola mundo');
// })

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);