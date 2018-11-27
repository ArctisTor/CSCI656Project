'use strict';

angular.module('chatWebApp')
.controller('ChannelCtrl', function($scope, $state, $filter, $uibModal, toastr, api, user) {

  $scope.channel = {};
  $scope.isLoading = false;

  $scope.init = function () {
    var req = {
      channel: 'general',
      tokenKey: user.getCurrentUser().tokenKey,
      user: user.getCurrentUser().user._id
    };
    api.getMessageByChannel(req).then(function (response) {
      $scope.channel.messages = response.data;
    })
    .catch(function (err) {
      // toastr.error('Failed to grab messages from channel: ' + $scope.channel.name);
      toastr.error(err.data.message);
      console.log(err);
    }).finally(function () {
      $scope.user = user.getCurrentUser().user;
      $scope.channel.name = 'general';
    });
  };

  $scope.getMessageByChannel = function () {

    $scope.isLoading = true;

    var req = {
      channel : $scope.channel.name,
      tokenKey: user.getCurrentUser().tokenKey,
      user: user.getCurrentUser().user._id
    };

    api.getMessageByChannel(req).then(function (response) {
      $scope.channel.messages = response.data;
    })
    .catch(function (err) {
      toastr.error(err.data.message);
      console.log(err);
    }).finally(function() {$scope.isLoading = false;})

  };

  $scope.submitMessage = function () {

    if ($scope.channel.text.length > 0 && user.isLoggedIn()) {

      $scope.isLoading = true;

      var request = {
        username : $scope.user.username,
        message : $scope.channel.text,
        channel : $scope.channel.name,
        tokenKey: user.getCurrentUser().tokenKey,
        user: user.getCurrentUser().user._id
      };

      api.addMessage(request).then( (result) => {

        $scope.getMessageByChannel();

      }, (err) => {
        toastr.error(err.data.message);
        console.log(err);
      }).finally(function () {
        $scope.isLoading = false;
      });

    }
  };

  $scope.logout = function() {

    $scope.isLoading = true;

    return user.logoutUser(user.getCurrentUser()).then(
      function() {
        $state.go('login');
      }).catch( (err) => {
      toastr.error('Could not logout user');
      console.log(err);
    }).finally(function() {$scope.isLoading = false;});

  };


  $scope.init();

});