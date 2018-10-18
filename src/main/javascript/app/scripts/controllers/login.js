'use strict';

angular.module('chatWebApp')
    .controller('LoginCtrl', function($scope, $state, $filter, $uibModal, toastr, api) {

        $scope.login = function(login) {

            var request = {
                userName : login.username,
                password : login.password
            }

            return api.login(request).then(

                function(result) {

                }, function (err) {

                }

            )
        }

    });