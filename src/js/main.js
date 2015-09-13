angular
  .module('haul', ['ngRoute'])
  .config(function ($routeProvider) {
    console.log('config firing')
    $routeProvider
      .when('/', {
        templateUrl: 'index.html',
        controller: 'MainControlBridge',
        controllerAs: 'bridge'
      })
  })
  .controller('MainControlBridge', function ($scope) {
    console.log('controller instantiated')
    var vm = this;
  })
