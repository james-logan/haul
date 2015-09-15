angular
  .module('haul', ['ngRoute'])
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
        controller: 'mainControlBridge',
        controllerAs: 'bridge'
      })
      .when('/bridge/select', {
        templateUrl: '/select',
        controller: 'mainControlBridge',
        controllerAs: 'bridge'
      })
      .when('/bridge/complete', {
        templateUrl: '/complete',
        controller: 'mainControlBridge',
        controllerAs: 'bridge'
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
  .controller('mainControlBridge', function ($scope, $http) {
    console.log('controller instantiated')
    var vm = this;

    vm.results;

    vm.form = {};

    vm.searchExercises = function (formData) {
      console.log('search function fired')
      $http
        .get('/api/exercises?exer=' + formData.search)
        .success(function (data) {
          vm.results = data;
          console.log(data)
        })
    }
  })
  .controller('frontPage', function ($scope) {
    console.log('front controller instantiated')
  })
  .controller('loginController', function ($scope) {
    console.log('login controller instantiated')
  })
  .controller('registerController', function ($scope) {
    console.log('register controller instantiated')
  })
