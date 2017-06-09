'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('HomeCtrl', function ($scope, $http, store, jwtHelper) {

    $scope.login = function(){
    	$http.post("backend/api-token-auth/", {'username': $scope.username, 'password': $scope.password}).success(function(response) {
          	$scope.logged = true;
          	$scope.jwt = response.token;
          	store.set('token', response.token);
        }).error(function(response, status) {
        	$scope.logged = false;
        });
    }

    $scope.logout = function(){
      $scope.logged = false;
      $scope.jwt = null;
      $scope.protectedResponse = "";
      store.remove('token');
    }

    $scope.isAuthenticated = function(){
      var token = store.get('token');
      if (token && !jwtHelper.isTokenExpired(token)){
        $scope.logged = true;
        $scope.jwt = token;
        return true;
      } else {
        return false;
      };
    }

    $scope.publicRequest = function(){
    	$http.get("backend/api/users-public").success(function(response) {
          	$scope.publicResponse = response;
        }).error(function(response) {
        	$scope.publicResponse = response.detail;
        });
    }

    $scope.protectedRequest = function(){
    	$http.get("backend/api/users-protected").success(function(response) {
          	$scope.protectedResponse = response;
        }).error(function(response) {
        	$scope.protectedResponse = response.detail;
        });
    }

    $scope.username = "PepOcho";
    $scope.password = "PepOcho";

    $scope.publicResponse = "";
    $scope.protectedResponse = "";

    $scope.isAuthenticated();
  });
