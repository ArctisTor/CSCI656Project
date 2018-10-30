'user strict'

angular.module('chatWebApp')
.service('api', function ($http, $q) {

  var basePath = '/api';
  var apiService = {};

  apiService.loginUser = function(params) {
    return $http.get(basePath+'/login', {params: params});
  };

  apiService.registerUser = function(params) {
    return $http.post(basePath+'/register', {params: params});
  };

  apiService.logoutUser = function(params) {
    return $http.delete(basePath+'/logout', {params: params});
  };

  apiService.addMessage = function (params) {
    return $http.post(basePath+'/message/add', {params: params});
  };

  apiService.getAllMessages = function (params) {
    return $http.get(basePath+'/message/getAll', {params: params});
  };

  apiService.getUnreadMessages = function (params) {
    return $http.get(basePath+'/message/getUnread', {params: params});
  };

  apiService.getMessageByChannels = function (params) {
    return $http.get(basePath+'/message/channel', {params: params});
  };


  return apiService;
});