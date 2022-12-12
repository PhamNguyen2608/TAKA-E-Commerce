const DTO = require('./DTO');
const HttpException = require('../../helpers/http_exception');
const catchRoutesError = require('../../helpers/catch_routes_error');
const RatingHandlers = require('./handlers');
const { ERROR } = require('../../configs/constants');

const { getSentiment } = require('../../helpers/nlp');
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
class RatingControllers {
  async createRate(req, res, next) {
    try {
      const data = DTO.createRate(req.body);
      const response = await RatingHandlers.createRate(data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
  async updateRating(req, res, next) {
    try {
      const { _id } = req.params;

      const { newData } = DTO.updateRating(_id, req.body);
      const response = await RatingHandlers.updateRating(_id, newData);

      // if (response.status === ERROR) return next(response.response);

      return res.json({
        response: response.response,
        message: response.status,
      });
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
  async removeRating(req, res, next) {
    try {
      const { _id } = req.params;

      DTO.removeRating(_id);
      const response = await RatingHandlers.removeRating(_id);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async queryRates(req, res, next) {
    try {
      const params = DTO.queryRates(req.query);
      const response = await RatingHandlers.queryRates(params);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async queryAllRates(req, res, next) {
    try {
      const { params, conditions } = DTO.queryAllRates(req.query);
      const response = await RatingHandlers.queryAllRates(params, conditions);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async getIsBought(req, res, next) {
    try {
      const params = DTO.getIsBought(req.query);
      const response = await RatingHandlers.getIsBought(params);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async sentimentComment(req, res, next) {
    const { data } = req.body;

    const { input, token } = getSentiment(data);

    var result = sentiment.analyze(input);
    result.tokens = token;
    delete result.comparative;

    return res.json({ result });
  }
}

module.exports = new RatingControllers();
