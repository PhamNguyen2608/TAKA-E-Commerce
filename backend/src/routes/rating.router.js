const { Router } = require('express');
const { USER, ADMIN } = require('../configs/constants');
const RatingControllers = require('../controllers/rating/index');
const auth = require('../middlewares/auth');
const ratingRouter = Router();

ratingRouter.post('/sentiment', RatingControllers.sentimentComment);
ratingRouter.get('/all', RatingControllers.queryAllRates);
ratingRouter.get('/', RatingControllers.queryRates);
ratingRouter.delete('/:_id', auth(ADMIN), RatingControllers.removeRating);
ratingRouter.put('/:_id', auth(ADMIN), RatingControllers.updateRating);
ratingRouter.get('/bought', RatingControllers.getIsBought);
ratingRouter.post('/', auth(USER), RatingControllers.createRate);

module.exports = ratingRouter;
