'use strict'


angular.module('chatWebApp',
    [
        'ui.bootstrap',
        'ui.router',
        'ui.select',
        'ngResource',
        'ngCookies',
        'toastr'
    ]).config(function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
        $locationProvider.hashPrefix('');
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('index', {
          abstract: true,
          url: ''
        })
        .state('layout', {
          parent: 'index',
          abstract: true,
          views: {
            'body@': {
              templateUrl: 'views/layout.html',
              controller: 'LayoutCtrl'
            }
          }
        })
        .state('login', {
          parent: 'layout',
          url: '/',
          views: {
            'container@layout' : {
              templateUrl: 'views/login.html',
              controller: 'LoginCtrl'
            }
          }

        })

}).config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        allowHtml : true,
        closeButton: true,
        tapToDismiss : true,
        timeOut: 4000
    })
})