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

        $stateProvider
            .state('index', {
                abstract: true,
                url: ''
            })
            .state('layout', {
                parent: 'index',
                abstract: true,
                views: {
                    'body@' : {
                        templateURL: 'views/layout.html',
                        controller: 'LayoutCtrl'
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