angular
  .module('haul', ['ngRoute', 'ngCookies'])
  .controller('mainControlBridge', function ($scope, $http) {
    console.log('controller instantiated')
    var vm = this;

    vm.results;

    vm.form = {};

    vm.workout = {
      name: "",
      exercises: [],
      author: "",
      authorId: ""
    };

    vm.searchExercises = function (formData) {
      console.log('search function fired')
      $http
        .get('/api/exercises?exer=' + formData.search)
        .success(function (data) {
          vm.results = data;
          console.log(data)
        })
    }

    vm.addExercise = function (exer) {
      console.log('addExercise firing')
      console.log(exer)
      vm.workout.exercises.push(exer)
    }

    vm.saveWorkout = function () {
      $http
        .post('/api/workout', vm.workout)
        .success(function(data) {
          console.log('success');
        })
    }
  })
  .controller('frontPage', function ($scope) {
    console.log('front controller instantiated')
  })
  .controller('logoutController', function ($scope, $http, $location) {
    console.log('logout controller instantiated')
    $http
      .post('/user/logout', {})
      .success(function () {
        console.log('logout successful')
        $location.path('/user/login')
      })
  })
  .controller('loginController', function ($scope, $http, $rootScope, $location) {
    var vm = this;
    vm.hide = true;
    console.log('login controller instantiated');
    vm.info = {
      username: "",
      password: ""
    }
    vm.login = function () {
      $http
        .post('/user/login', vm.info)
        .success(function(data) {
          console.log(data)
          $rootScope.userData = data;
          $location.path('/bridge/newworkout')
        })
        .error(function(data) {
          console.log(data)
        })

    }
  })
  .controller('registerController', function ($scope, $http, $location) {
    console.log('register controller instantiated')
    var vm = this;
    vm.info = {
      email: "",
      sex: "",
      age: "",
      username: "",
      password: ""
    }
    vm.register = function () {
      $http
        .post('/user/register', vm.info)
        .success(function () {
          $location.path('/bridge/newworkout');
        })
    }
  })
  .controller('workOutCompletionController', function ($scope, $http, $routeParams) {
    var vm = this;
    console.log('completions controller instantiated');

    vm.sets = function (exer) {
      return new Array(exer.sets)
    }

    $http
      .get('/api/workout?id=' + $routeParams.id)
      .success(function (data) {
        vm.workout = data;
      })
  })
  .controller('selectController', function ($scope, $http) {
    console.log('select Controller instantiated')
    var vm = this;
    $http
      .get('/api/workouts')
      .success(function (data) {
        vm.workouts = data;
      })

  })
  .controller('createProgramController', function ($scope, $http) {
    var vm = this;
    vm.workouts = [];
    vm.cycle = 7;
    vm.program = {
      name: "",
      days: []
    }
    vm.days = function () {
      return new Array(vm.cycle)
    }
    vm.submit = function () {
      $http
        .post('/api/programs', vm.program)
        .success(function (data) {
          console.log('it worked')
        })
    }
    $http
      .get('/api/workouts')
      .success(function (data) {
        vm.workouts = data;
      })

  })
