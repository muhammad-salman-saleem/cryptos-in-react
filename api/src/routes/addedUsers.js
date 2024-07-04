const { addUser } = require('../services/userService');
const db = require('../models');


const User = db.addedUser;

const post = async (req, res) => {
  const addedUser = req.body;
  const user = req.user;

  if (!(user && addedUser)) {
    return res.status(401).json({ msg: 'unathorized' });
  }
  const existedUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (existedUser) {
    return res.status(409).json({ msg: `Email is already taken` });
  }

  addUser(addedUser, user)
    .then((id) => {
      if (id) {
        return res.status(201).json({ id: id, msg: "user added" });
      } else {
        return res.status(401).json({ msg: 'unathorized' });
      }
    })
    .catch((err) => {
        console.error(err);
        const errMsg = err.message || 'An internal server error occurred';
        res.status(500).json({ msg: 'Internal server error: ' + errMsg });
    });
};

module.exports = { post };
