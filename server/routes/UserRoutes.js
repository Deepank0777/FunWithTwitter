const express 	 		= 	require('express');
const router 	 		= express.Router();
const expressValidator  = require('express-validator');
router.use(expressValidator());

const userController = require('../controllers/UserController.js');

//Routes
router.get('/logout',		userController.logout   );

router.post('/login',		userController.login    );
router.post('/register',	userController.register );

module.exports = router;