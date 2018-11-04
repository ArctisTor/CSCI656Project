'use strict'

angular.module('chatWebApp')
.service('user', function(api) {


  var user = {}, userService = {};

  userService.loginUser = function (params) {

    return api.loginUser(params).then((result) => {
      user.tokenKey = result.data.tokenKey;
      user.user = result.data.user;
      return user;
    });
  };

  userService.registerUser = function (params) {

    return api.registerUser(params).then((result) => {
      user.tokenKey = result.data.tokenKey;
      user.user = result.data.user;
      return user;
    });
  };

  userService.logoutUser = function () {

    if (!tokenKey) {
      return api.logoutUser(params).then((result) => {
        if (result === true) {
          user = {};
        }
      });
    }

    return userService.isLoggedIn();
  };

  userService.isLoggedIn = function () {
    return (!!user.user && !!user.tokenKey);
  };


  return userService;
});