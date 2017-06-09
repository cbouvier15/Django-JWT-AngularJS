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

		// ################################################################################
	    // JWT Auth settings
	    // ################################################################################
	    jwtInterceptorProvider.tokenGetter = function(config ,store, jwtHelper) {

	      // Skip authentication for any requests ending in .html
	      if (config.url.substr(config.url.length - 5) === '.html') {
	        return null;
	      }
	      var token = store.get('token');
	      return ((token && (!jwtHelper.isTokenExpired(token))) ? token : null);
	    };

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
