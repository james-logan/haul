angular
  .module('haul', ['ngRoute', 'ngCookies', 'ui.calendar'])
  .controller('mainControlBridge', function ($scope, $http, $location) {
    console.log('controller instantiated')
    var vm = this;

    var href = $location.path()
    console.log(href)
    $('a[href="#' + href + '"]').children('.box').css('background-color', 'rgba(169, 169, 169, .5)')

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
  .controller('workOutCompletionController', function ($scope, $http, $location, $routeParams) {
    var vm = this;
    console.log('completions controller instantiated');

    var href = $location.path()
    $('a[href="#/bridge/select"]').children('.box').css('background-color', 'rgba(169, 169, 169, .5)')

    vm.setExpander = function (workout) {
      workout.exercises = workout.exercises.map(function (exer) {
        var array = [];
        var setObj = function (reps) {
          this.reps = reps;
          this.completionStatus = false;
          this.upTick = function () {
            this.reps++
          };
          this.downTick = function () {
            this.reps--
          }
          this.complete = function () {
            this.completionStatus = true;
          }

        }
        while (array.length < exer.sets) {
          var insert = new setObj(exer.reps)
          array.push(insert)
        }
        exer.sets = array;
        return exer
      })
      return workout
    }

    $http
      .get('/api/workout?id=' + $routeParams.id)
      .success(function (data) {
        vm.workout = vm.setExpander(data)
      })

    vm.truncate = function (compWork) {
      compWork.exercises = compWork.exercises.map(function (exer) {
        exer.sets = exer.sets.map(function (set) {
          if (set.completionStatus === true) {
            set = set.reps;
          } else {
            set = 0;
          }
          return set
        })
        return exer
      })
      return compWork
    }

    vm.completeWorkout = function () {
      var parcel = vm.truncate(vm.workout);
      $http
        .post('/api/complete', parcel)
        .success(function(data) {
          $location.path('/bridge/schedule')
        })
    }
  })
  .controller('selectController', function ($scope, $http, $location) {
    console.log('select Controller instantiated')
    var vm = this;

    var href = $location.path()
    console.log(href)
    $('a[href="#' + href + '"]').children('.box').css('background-color', 'rgba(169, 169, 169, .5)')

    $http
      .get('/api/workouts')
      .success(function (data) {
        vm.workouts = data;
      })
  })
  .controller('createProgramController', function ($scope, $http, $location) {
    var vm = this;

    var href = $location.path()
    console.log(href)
    $('a[href="#' + href + '"]').children('.box').css('background-color', 'rgba(169, 169, 169, .5)')

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
  .controller('statsController', function ($http, $location) {
    var vm = this;
    var href = $location.path()
    console.log(href)
    $('a[href="#' + href + '"]').children('.box').css('background-color', 'rgba(169, 169, 169, .5)')

    vm.info;
    $http
      .get('/user/stats')
      .success(function (data) {
        vm.info = data;
      })
  })
  .controller('scheduleController', function ($scope, $http) {
    var vm = this;
    vm.eventSources = [];

    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'month basicWeek basicDay',
          center: 'title',
          right: 'today prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };

    $http
      .get('/api/schedule')
      .then(function (data) {
        console.log(data);
        vm.eventSources.push(data.data);
      })
  })
  .controller('goalController', function ($scope, $http) {
    var vm = this;
    vm.programs;
    vm.goals = {};
    vm.goalWeight = {};
    vm.program;
    vm.exercises;
    $http
      .get('/api/programs')
      .then(function (data) {
        vm.programs = data.data;
      })
    // $http
    //   .get('/api/goals')
    //   .then(function (data) {
    //     vm.goals = data.data.goals;
    //     vm.program = data.data.program;
    //   })

    vm.addGoal = function (exer) {
      var goalExer = {
        name: exer.name,
        _id: exer._id
      }
      vm.goals[exer.name] = goalExer;
    }

    vm.postGoals = function () {
      $http
        .post('/api/goals/goals', vm.goals)
        .then(function (data) {

        })
    }
    vm.adoptProgram = function (index) {
      vm.program = vm.programs[index];
      $http
        .post('/api/goals/program', vm.program)
        .then(function (data) {
          //do nothing
          vm.parseExercises(data.data)
        })
    }

    vm.parseExercises = function (obj) {
      var workArr = []
      obj.days.forEach(function (day) {
        if (day !== 'Rest') {
          workArr.push(day.exercises);
        }
      })
      workArr = _.flatten(workArr)
      var retArr = _.uniq(workArr, false, "_id")
      vm.exercises = retArr;
    }

  })
