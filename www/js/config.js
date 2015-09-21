angular
  .module('haul')
  // .run(function ($rootScope, $cookies, $location) {
  //   $rootScope.$on('$routeChangeStart', function (event, nextRoute) {
  //     console.log($cookies.getObject('user'))
  //     $rootScope.auth = $cookies.get('user')

  //     if (nextRoute.$$route && nextRoute.$$route['private'] && !$rootScope.auth) {
  //       $location.path('/user/login')
  //     }
  //   });
  // })
  .config(function ($routeProvider) {
    console.log('config firing')
    $routeProvider
      .when('/', {
        templateUrl: 'templates/front.html',
        controller: 'frontPage',
        controllerAs: 'front'
      })
      .when('/bridge/newworkout', {
        templateUrl: 'templates/newworkout.html',
        controller: 'mainControlBridge',
        controllerAs: 'bridge',
        'private': true
      })
      .when('/bridge/stats', {
        templateUrl: 'templates/stats.html',
        controller: 'statsController',
        controllerAs: 'stat',
        'private': true
      })
      .when('/bridge/schedule', {
        templateUrl: 'templates/schedule.html',
        controller: 'scheduleController',
        controllerAs: 'sched',
        'private': true
      })
      .when('/bridge/programs', {
        templateUrl: 'templates/programs.html',
        controller: 'createProgramController',
        controllerAs: 'prog',
        'private': true
      })
      .when('/bridge/select', {
        templateUrl: 'templates/select.html',
        controller: 'selectController',
        controllerAs: 'select',
        'private': true
      })
      .when('/bridge/complete/:id', {
        templateUrl: 'templates/complete.html',
        controller: 'workOutCompletionController',
        controllerAs: 'complete',
        'private': true
      })
      .when('/user/login', {
        templateUrl: 'templates/login.html',
        controller: 'loginController',
        controllerAs: 'login'
      })
      .when('/user/logout', {
        templateUrl: 'templates/logout.html',
        controller: 'logoutController',
        controllerAs: 'logout'
      })
      .when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'registerController',
        controllerAs: 'register'
      })
      .when('/exercise', {
        templateUrl: 'templates/exercise.html',
        controller: 'loginController',
        controllerAs: 'login'
      })
      .when('/bridge/goals', {
        templateUrl: 'templates/goals.html',
        controller: 'goalController',
        controllerAs: 'goal'
      })

  })
