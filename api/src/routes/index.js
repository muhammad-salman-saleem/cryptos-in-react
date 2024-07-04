const express = require('express');
const { login, signup, verifyToken } = require('./user');
const { saveUser, checkOwnership } = require('../services/userAuth');
const minerRoutes = require('./miners');
const addUser = require('./addedUsers');
const router = express.Router();

//endpoints
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Ok' });
});

router.post('/u/signup', saveUser, signup);

router.post('/u/login', login);

router.put('/miner/:id', checkOwnership, minerRoutes.update);
router.get('/miner/:id', minerRoutes.getOne);
router.get('/miner', minerRoutes.getAll);
router.post('/miner', checkOwnership, minerRoutes.post);
router.post('/addUser', checkOwnership, addUser.post);
router.delete('/miner/:id', checkOwnership, minerRoutes.deleteAMiner);

//more endpoints here

module.exports = router;
