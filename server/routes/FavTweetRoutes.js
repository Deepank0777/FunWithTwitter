const express         =	require('express');
const router          = express.Router();
const FavTweetController = require('../controllers/FavTweetController.js');

/*
 * GET
 */
router.get('/', FavTweetController.getTweets);

/*
 * POST
 */
router.post('/', FavTweetController.saveFavTweet);

/*
 * DELETE
 */
router.delete('/:id', FavTweetController.removeFavTweet);
/*
 * PUT(UPDATE)
 */
// router.put('/update-notes/:id',FavTweetController.updateNotes);

module.exports = router;
