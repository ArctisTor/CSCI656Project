'use strict'


angular.module('chatWebApp',
    [
        'ui.bootstrap',
        'ui.router',
        'ui.select',
        'ngResources',
        'ngFileUpload',
        'ngAnimate',
        'ngCookies',
        'toastr'
    ]).config(function ($stateProvicer, $locationProvider, $urlRouterProvider, $httpProvider) {

}).config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        allowHtml : true,
        closeButton: true,
        tapToDismiss : true,
        timeOut: 4000
    })
})