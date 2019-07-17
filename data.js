'use strict';
var request = require('request');

var url = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium';

const getQuestions = (cb) => request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      cb(err);
    } else if (res.statusCode !== 200) {
      cb(new Error(res.statusCode));
    } else {
      cb(err, data.results);
    }
});

module.exports = {
  getQuestions,
};
