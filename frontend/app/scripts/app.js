'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
angular
	.module('frontendApp', [
		'ngCookies',
		'ngSanitize',
		'ui.router',
		'angular-storage',
		'angular-jwt'
	])

	.config(function($stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider) {

		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

		jwtInterceptorProvider.tokenGetter = function(store) {
			return store.get('token');
		};

		// Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
		$httpProvider.interceptors.push('jwtInterceptor');

		//
		// For any unmatched url, redirect to /state1
		$urlRouterProvider.otherwise("/");

		$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'home'
		})  
});
