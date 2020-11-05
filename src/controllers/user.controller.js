const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async signup(req, res) {
    // console.log(req.body);
    // res.send('received');

    try {
      const { userName, email, password } = req.body;
      const encryptedPassword = await bcrypt.hash(password, 6);
      const user = await User.create({ userName, email, password: encryptedPassword });

      // const token = jwt.sign(
      //   { id: user._id, },
      //   proces.env.SECRET,
      //   { expiresIn: 60 * 60 * 24 * 365 }
      // );

      res.status(200).json({ user });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        throw Error('User does not exist');
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw Error('User/Password invalid!');
      }

      // const token = jwt.sign(
      //   { id: user._id, },
      //   proces.env.SECRET,
      //   { expiresIn: 60 * 60 * 24 * 365 }
      // );

      res.status(200).json({ user });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  },

  async logout(req, res) {

  }
}