const fetch = require('node-fetch');
const walkScoreController = {};

walkScoreController.getWalkScore = (req, res, next) => {
  console.log('Invoked walkScoreController.getWalkScore', req.query);
  const { lat, lon } = req.query;
  fetch(
    `https://api.walkscore.com/score?format=json&lat=${lat}&lon=${lon}&transit=1&bike=1&wsapikey=${process.env.WALKSCORE_KEY}`,
    {
      method: 'GET',
      redirect: 'follow',
    }
  )
    .then(response => {
      // console.log('response', response.status, response.statusText);
      res.statusCode = response.status;
      res.statusMessage = response.statusText;
      return response.json();
    })
    .then(data => {
      // console.log('walkScore data', data);
      // console.log('res', res.statusCode, res.statusMessage);
      res.locals.walkscore = data;
      return next();
    })
    .catch(error =>
      next({
        message: 'Error in walkScoreController.getWalkScore middleware',
        serverMessage: {
          err: error,
        },
      })
    );
};

module.exports = walkScoreController;
