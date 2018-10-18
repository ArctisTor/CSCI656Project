'use strict'

angular.module('chatWebApp')
.controller('MainCtrl', function ($scope, $state, $transitions) {
    $transitions.onError({}, function(transition) {
        var error = transition.error();
        if (error.detail && error.detail.redirectTo) {
            $state.go(error.detail.redirectTo);
        }
    })
});