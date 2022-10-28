const { Router } = require('express');
const { UsersController } = require('../controllers/user');

const router = Router();

router.get('/connect', UsersController.registerUser);

module.exports = router;