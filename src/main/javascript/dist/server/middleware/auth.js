const Auth = require('../models/authorizationToken');

exports.authenticate = function (req, res, next) {

  var query;
  if (req.body.tokenKey) {
    query = {tokenKey: req.body.tokenKey, userId: req.body.user};
  } else  if (req.query.tokenKey){
    query = {tokenKey: req.query.tokenKey, userId: req.query.user};
  } else {
    return next(new Error('Session has expired. Please log back in.'));
  }


  Auth.findOne(query ,
    (err, user) => {

      if (err) {
        return next(new Error(err));
      } else if (!user){
        return next(new Error('Session has expired. Please log back in.'));
      }  else {
        next(null, req);
      }

    });


};