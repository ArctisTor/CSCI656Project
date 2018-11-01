'use strict';

angular.module('chatWebApp')
    .controller('LoginCtrl', function($scope, $state, $filter, $uibModal, toastr, api) {


        $scope.user = {
            username : '',
            password: '',
        };

        $scope.login = function() {

            var request = {
                userName : $scope.user.username,
                password : $scope.user.password
            };

            return api.loginUser(request).then(
              (result) => {
                  console.log(result);
              }).catch( (err) => {
                toastr.error('Invalid user/password combination.');
                console.log(err);
            });
        };

    });