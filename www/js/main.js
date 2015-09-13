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
      .when('/newworkout', {
        templateUrl: '/newworkout',
        controller: 'mainControlBridge',
        controllerAs: 'bridge'
      })
  })
  .controller('mainControlBridge', function ($scope) {
    console.log('controller instantiated')
    var vm = this;
  })
  .controller('frontPage', function ($scope) {
    console.log('front controller instantiated')
  })
