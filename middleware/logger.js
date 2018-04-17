'use strict';

function requestLogger(req, res, next){
  const now = new Date();
  console.log(`${now.toLocaleDateString()} ${now.toLocaleTimeString()} - type:${req.method} from:${req.url}`);
  next();
}

module.exports = {requestLogger};