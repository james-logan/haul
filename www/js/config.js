angular
  .module('haul')
  .config(function ($routeProvider) {
    console.log('config firing')
    $routeProvider
      .when('/', {
        templateUrl: '/front',
        controller: 'frontPage',
        controllerAs: 'front'
      })
      .when('/bridge/newworkout', {
        templateUrl: '/newworkout',
        controller: 'mainControlBridge',
        controllerAs: 'bridge'
      })
      .when('/bridge/stats', {
        templateUrl: '/stats',
        controller: 'mainControlBridge',
        controllerAs: 'bridge'
      })
      .when('/bridge/schedule', {
        templateUrl: '/schedule',
        controller: 'mainControlBridge',
        controllerAs: 'bridge'
      })
      .when('/bridge/programs', {
        templateUrl: '/programs',
        controller: 'createProgramController',
        controllerAs: 'prog'
      })
      .when('/bridge/select', {
        templateUrl: '/select',
        controller: 'selectController',
        controllerAs: 'select'
      })
      .when('/bridge/complete/:id', {
        templateUrl: '/complete',
        controller: 'workOutCompletionController',
        controllerAs: 'complete'
      })
      .when('/login', {
        templateUrl: '/login',
        controller: 'loginController',
        controllerAs: 'login'
      })
      .when('/register', {
        templateUrl: '/register',
        controller: 'registerController',
        controllerAs: 'register'
      })

  })
