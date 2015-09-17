angular
  .module('haul', ['ngRoute'])
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
  .controller('loginController', function ($scope) {
    console.log('login controller instantiated')
  })
  .controller('registerController', function ($scope) {
    console.log('register controller instantiated')
  })
