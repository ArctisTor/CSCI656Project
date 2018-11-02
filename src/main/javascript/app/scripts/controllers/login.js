'use strict';

angular.module('chatWebApp')
    .controller('LoginCtrl', function($scope, $state, $filter, $uibModal, toastr, api) {

        $scope.user = {
            username : '',
            password: '',
            register: false
        };

        $scope.login = function() {

          if ($scope.user.register) {

            var request = {
              userName : $scope.user.newUser,
              password: $scope.user.newPass
            };

            return api.registerUser(request).then(
              (result) => {
               console.log(result);
              }
            ).catch( (err) => {
              toastr.error('There was an error with registering the account.');
              console.log(err);
            })

          } else {

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

          }
        };

        $scope.register = function() {
          $scope.user.register = !$scope.user.register;
        };

    });