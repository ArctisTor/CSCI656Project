'use strict'

angular.module('chatWebApp')
.service('user', function(api) {


  var user = {}, userService = {};

  userService.loginUser = function (params) {

    return api.loginUser(params).then((result) => {
      user = result.data;
      return user;
    });
  };

  userService.registerUser = function (params) {

    return api.registerUser(params).then((result) => {
      userService.setUser(result.data);
      return user;
    });
  };

  userService.logoutUser = function (params) {

    if (user.tokenKey) {
      return api.logoutUser(params).then((result) => {
        if (result === true) {
          user = {};
        }
        return result;
      });
    }

    return false;
  };

  userService.isLoggedIn = function () {
    return (!!user.user && !!user.tokenKey);
  };

  userService.setUser = function(params) {
    user.tokenKey = params.tokenKey;
    user.user = params.user;
  };

  userService.getCurrentUser = function () {
    return user;
  };


  return userService;
});