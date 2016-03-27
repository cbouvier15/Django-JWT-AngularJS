'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('HomeCtrl', function ($scope, $http, store) {
    console.log("Home");

    $scope.logged = false;
    $scope.username = "";
    $scope.password = "";
    $scope.jwt = "";

    $scope.publicResponse = "";
    $scope.protectedResponse = "";

    $scope.login = function(){
    	$http.post("backend/api-token-auth/", {'username': $scope.username, 'password': $scope.password}).success(function(response) {
          	$scope.logged = true;
          	$scope.jwt = response.token;
          	store.set('token', response.token);
        }).error(function(response, status) {
        	$scope.logged = false;
        });
    }

    $scope.publicRequest = function(){
    	$http.get("backend/api/users").success(function(response) {
          	$scope.publicResponse = response;
        }).error(function(response, status) {
        	$scope.publicResponse = response;
        });
    }

    $scope.protectedRequest = function(){
    	$http.get("backend/api/users-protected").success(function(response) {
          	$scope.protectedResponse = response;
        }).error(function(response, status) {
        	$scope.protectedResponse = response;
        });
    }
  });
