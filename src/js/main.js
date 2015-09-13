angular
  .module('haul', ['ngRoute'])
  .config(function ($routeProvider) {
    console.log('config firing')
    $routeProvider
      .when('/newworkout', {
        templateUrl: 'views/newworkout.html',
        controller: 'MainControlBridge',
        controllerAs: 'bridge'
      })
  })
  .controller('MainControlBridge', function ($scope) {
    console.log('controller instantiated')
    var vm = this;
  })
