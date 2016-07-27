var app = angular.module( 'MyApp', ['ui.router', 'satellizer', 'ngResource',
    'ngSanitize', 'com.2fdevs.videogular', 'com.2fdevs.videogular.plugins.controls',
    ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'partials/contact.html',
      controller: 'ContactCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl',
      resolve: { skipIfAuthenticated: skipIfAuthenticated }
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'partials/signup.html',
      controller: 'SignupCtrl',
      resolve: { skipIfAuthenticated: skipIfAuthenticated }
    })
    .state('account', {
      url: '/account',
      templateUrl: 'partials/profile.html',
      controller: 'ProfileCtrl',
      resolve: { loginRequired: loginRequired }
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'partials/forgot.html',
      controller: 'ForgotCtrl',
      resolve: { skipIfAuthenticated: skipIfAuthenticated }
    })
    .state('resetToken', {
      url: '/reset/:token',
      templateUrl: 'partials/reset.html',
      controller: 'ResetCtrl',
      resolve: { skipIfAuthenticated: skipIfAuthenticated }
    })
    .state('showProviderId', {
      url: '/show/:provider_id',
      templateUrl: 'partials/show.html',
      controller: 'ShowCtrl'
    })
    .state('itunesdummy', {
      url: '/itunesdummy',
      templateUrl: 'partials/itunesdummy.html',
      controller: 'DumCtrl'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardCtrl'
    })
    $locationProvider.html5Mode(true);


    // TODO handle this by sharing config info!!!
    var isLocal = window.location.host.toLowerCase() === 'localhost:3000';
    var origin = window.location.origin;

    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/signup';
    $authProvider.facebook({
      url: '/auth/facebook',
      clientId: (isLocal) ? '866227026817147' : '866227026817147',
      redirectUri: origin + '/auth/facebook/callback'
    });
    $authProvider.google({
      url: '/auth/google',
      clientId: (isLocal) ? '704647733540-r0l1rgc9s8mtbl9grnj3h6712adjjua5.apps.googleusercontent.com' :
      '704647733540-r0l1rgc9s8mtbl9grnj3h6712adjjua5.apps.googleusercontent.com',
      // clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com'
      redirectUri: origin + '/auth/google/callback'
    });
    $authProvider.twitter({
      url: '/auth/twitter'
    });

    function skipIfAuthenticated($location, $auth, $http) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }

    function loginRequired($location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }
  })
  .run(function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  });
