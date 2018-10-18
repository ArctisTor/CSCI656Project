'use strict'

angular.module('chatWebApp')
.service('api', function($http, $q) {

    var service = {};
    var basePath = '/api';

    service.login = function(request) {
        return $http.get(basePath+'/user/login', request);
    };

    service.getUser = function(requestId) {
        return $http.get(basePath +'/user/'+requestId);
    };


    return service;
});