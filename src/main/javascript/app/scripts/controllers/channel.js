'use strict';

angular.module('chatWebApp')
.controller('ChannelCtrl', function($scope, $state, $filter, $uibModal, toastr, api, user) {

  $scope.channel = {};
  $scope.isLoading = false;

  $scope.init = function () {
    api.getMessageByChannel({channel : "general"}).then(function (response) {
      $scope.channel.messages = response.data;
    })
    .catch(function (err) {
      // toastr.error('Failed to grab messages from channel: ' + $scope.channel.name);
      console.log(err);
    }).finally(function () {
      $scope.user = user.getCurrentUser().user;
      $scope.channel.name = 'general';
    });
  };

  $scope.getMessageByChannel = function () {

    var req = {
      channel : $scope.channel.name
    };

    api.getMessageByChannel(req).then(function (response) {
      $scope.channel.messages = response.data;
    })
    .catch(function (err) {
      toastr.error('Failed to grab messages from channel: ' + $scope.channel.name);
      console.log(err);
    })

  };

  $scope.submitMessage = function () {

    if ($scope.channel.text.length > 0 && user.isLoggedIn()) {

      $scope.isLoading = true;

      var request = {
        "username" : $scope.user.username,
        "message" : $scope.channel.text,
        "channel" : $scope.channel.name,
      };

      api.addMessage(request).then( (result) => {

        $scope.getMessageByChannel();

      }, (err) => {
        toastr.error("Error adding message to channel: " + $scope.channel.name);
        console.log(err);
      }).finally(function () {
        $scope.isLoading = false;
      });

    }
  };

  $scope.logout = function() {

    // api.logoutUser(user.getCurrentUser()).then(function () {
    //
    //   $state.go('login');
    //
    // }).catch((err) => {
    //     toastr.error('Could not logout user');
    //     console.log(err);
    // });

    return user.logoutUser(user.getCurrentUser()).then(
      function() {
        $state.go('login');
      }).catch( (err) => {
      toastr.error('Could not logout user');
      console.log(err);
    });

  };


  $scope.init();

});