'use strict'

angular.module('chatWebApp')
.service('user', function(api) {


  var user, tokenKey, userService = {};

  userService.loginUser = function (params) {

    return api.loginUser(params).then((result) => {
      tokenKey = result.tokenKey;
      user = result.user;
    });
  };

  userService.registerUser = function (params) {

    return api.registerUser(params).then((result) => {
      tokenKey = result.tokenKey;
      user = result.user;
    });
  };

  userService.logoutUser = function () {

    if (!tokenKey) {
      return api.logoutUser(params).then((result) => {
        if (result === true) {
          tokenKey = null;
          user = null;
        }
      });
    }

    return userService.isLoggedIn();
  };

  userService.isLoggedIn = function () {
    return (!!user && !!tokenKey);
  };


  return userService;
});