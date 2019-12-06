'use strict';

angular.module('chatWebApp')
.controller('ChannelCtrl', function($scope, $state, $filter, $uibModal, toastr, api, user) {

  $scope.channel = {
    current: 1,
    itemsPerPage: 5,
    hasNext: false,
    hasPrevious: false
  };

  $scope.isLoading = false;

  $scope.init = function () {

    if (!user.getCurrentUser().user) {
      toastr.error('Session expired. Please log back in.');
      $state.go('login');
    }

    var req = {
      channel: 'general',
      tokenKey: user.getCurrentUser().tokenKey,
      user: user.getCurrentUser().user._id
    };
    api.getMessageByChannel(req).then(function (response) {
      $scope.channel.messages = response.data;
      $scope.channel.paginationMessages = $scope.paginateMessages($scope.channel.current);
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

  $scope.paginateMessages = function(currentPage) {

    var paginationList = [];


    var width = (currentPage)*$scope.channel.itemsPerPage,
      begin = ($scope.channel.messages.length) - width;

    if (begin < 0) {
      begin = 0;
    }
    var end = begin + width;

    paginationList = $scope.channel.messages.slice(begin, end);


    //can expand but can't shrink
    if (begin > 0) {
      $scope.channel.hasNext = true;
      $scope.channel.hasPrevious = true;
      if (width <= $scope.channel.itemsPerPage) {
        $scope.channel.hasPrevious = false;
      }
    }

    //can shrink but can't expand
    else if (end >= width) {
      $scope.channel.hasNext = true;
      $scope.channel.hasPrevious = true;
      if (width >= $scope.channel.messages.length) {
        $scope.channel.hasNext = false;
      }
    }

    // if (paginationList.length < $scope.channel.itemsPerPage) {
    //   $scope.channel.hasPrevious = false;
    //   if (paginationList.length <= $scope.channel.messages.length) {
    //     $scope.channel.hasNext = false;
    //   } else {
    //     $scope.channel.hasNext = true;
    //   }
    //   paginationList = $scope.channel.messages.slice(0,$scope.channel.itemsPerPage );
    // }

    return paginationList;

  };

  $scope.nextMessagePage = function() {
    if ($scope.channel.hasNext) {
      $scope.channel.current++;
      $scope.channel.paginationMessages = $scope.paginateMessages($scope.channel.current);
    }
  };

  $scope.previousMessagePage = function () {
    if ($scope.channel.hasPrevious) {
      $scope.channel.current--;
      $scope.channel.paginationMessages = $scope.paginateMessages($scope.channel.current);
    }
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
      $scope.channel.current = 1;
      $scope.channel.paginationMessages = $scope.paginateMessages($scope.channel.current);
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