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
    $('.front').parent().css('background-color', 'rgb(230, 230, 230)')
  })
  .controller('logoutController', function ($http, $location) {
    $http
      .post('/user/logout', {})
      .then(function () {
        console.log('logout successful')
        $location.path('/user/login')
      }, function (err) {
        console.log('logout failed', err)
      })
  })
  .controller('loginController', function ($scope, $http, $rootScope, $location) {
    var vm = this;
    vm.info = {
      username: "",
      password: ""
    }
    vm.login = function () {
      $http
        .post('/user/login', vm.info)
        .then(function(data) {
          console.log(data)
          $rootScope.userData = data;
          $location.path('/bridge/newworkout')
          }, function(err) {
          console.log(err)
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
        .then(function () {
          $location.path('/bridge/newworkout');
        }, function (err) {
          console.log('registration failed', err)
        })
    }
  })
  .controller('workOutCompletionController', function ($scope, $http, $location, $routeParams, $window) {
    var vm = this;
    vm.day = $window.sessionStorage.day

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
      .then(function (data) {
        vm.workout = vm.setExpander(data.data)
      }, function (err) {
        console.log(err)
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
      parcel.progDay = vm.day;
      $http
        .post('/api/complete', parcel)
        .then(function(data) {
          $location.path('/bridge/schedule')
        }, function (err) {
          console.log(err)
        })
    }
  })
  .controller('selectController', function ($scope, $http, $location, $window) {
    console.log('select Controller instantiated')
    var vm = this;
    vm.today;

    var href = $location.path()
    console.log(href)
    $('a[href="#' + href + '"]').children('.box').css('background-color', 'rgba(169, 169, 169, .5)')
    $http
      .get('/api/completed')
      .then(function (data) {
        var day
        console.log(data.data)
        if (data.data) {
          data.data.completed.reverse().some(function (item, i) {
            if (item.progCount) {
              day = item.progCount
              return true;
            }
          })
        }
        day = day || -1;
        vm.getProgram(day);
      }, function (err) {
        console.log(err)
        if (err.data.redirect === true) {
          $location.path('/user/login')
        }
      })
    $http
      .get('/api/workouts')
      .then(function (data) {
        vm.workouts = data.data;
      }, function (err) {
        console.log(err)
        if (err.data.redirect === true) {
          $location.path('/user/login')
        }
      })

    vm.getProgram = function (day) {
      $http
        .get('/api/goals')
        .then(function (data) {
          var programDays = data.data.program.days
          if (day === programDays.length) {
            day = 0;
          }
          else if (day) {
            day ++
          }
          $window.sessionStorage.day = day;
          vm.today = programDays[day]
        })
    }
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
        .then(function (data) {
          console.log('it worked')
        }, function (err) {
          console.log(err)
          if (err.data.redirect === true) {
            $location.path('/user/login')
          }
        })
    }

    $http
      .get('/api/workouts')
      .then(function (data) {
        vm.workouts = data;
      }, function (err) {
        console.log(err)
        if (err.data.redirect === true) {
          $location.path('/user/login')
        }
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
      .then(function (data) {
        vm.info = data;
      }, function (err) {
        console.log(err)
        if (err.data.redirect === true) {
          $location.path('/user/login')
        }
      })
  })
  .controller('scheduleController', function ($scope, $http, $location) {
    var vm = this;
    vm.eventSources = [];

    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: false,
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
        vm.getGoals(data.data)
      }, function (err) {
        console.log(err)
        if (err.data.redirect === true) {
          $location.path('/user/login')
        }
      })

    vm.getGoals = function (pastWorkouts) {
      $http
        .get('/api/goals')
        .then(function (data) {
          //do shit with data
          console.log(data);
          vm.createFuture(pastWorkouts, data.data)
        }, function (err) {
          console.log(err)
          if (err.data.redirect === true) {
            $location.path('/user/login')
          }
        })
    }

    vm.createFuture = function (pastWorkouts, goalsObj) {
      var eventsList = [];
      var lastWo = -1;
      var lastDay;
      // console.log(pastWorkouts)
      pastWorkouts.events.reverse().some(function (wo) {
        if (wo.progDay) {
          lastWo = wo.progDay;
          lastDay = new Date(wo.date)
          return true;
        }
      })
      var today = new Date();
      today = today.toDateString()
      var firstDay
      if (lastDay.toDateString() === today) {
        firstDay = new Date(today)
        firstDay = new Date(firstDay.valueOf() + (24*60*60*1000))
      } else {
        firstDay = new Date(today)
      }

      var i = parseInt(lastWo + 1);
      while(eventsList.length < 90) {
        if (goalsObj.program.days[i] !== "Rest") {
          var even = _.clone(goalsObj.program.days[i])

          even.start = firstDay.toISOString()

          eventsList.push(even)
        }
        i = ((i+1) % goalsObj.program.days.length)
        firstDay = new Date(parseInt(firstDay.valueOf() + (24*60*60*1000)))
      }
      eventsList = eventsList.map(function (event) {
        event.title = event.name;
        event.allDayDefault = true;
        return event
      })

      var eventObj = {
        events: eventsList,
        color: 'pink',
        textColor: 'black',
        allDayDefault: true
      }

      vm.eventSources.push(eventObj)
      // $scope.$apply();
    }
  })
  .controller('goalController', function ($scope, $http) {
    var vm = this;
    vm.programs;
    vm.goals = {};
    vm.goalWeight;
    vm.program;
    vm.exercises;
    $http
      .get('/api/programs')
      .then(function (data) {
        vm.programs = data.data;
      }, function (err) {
        console.log(err)
        if (err.data.redirect === true) {
          $location.path('/user/login')
        }
      })
    $http
      .get('/api/goals')
      .then(function (data) {
        if (data.data.goals) {
          vm.goals = data.data.goals;
        }
        vm.goalWeight = data.data.goalWeight;
        vm.program = data.data.program;
        vm.parseExercises(data.data.program);
      }, function (err) {
        console.log(err)
        if (err.data.redirect === true) {
          $location.path('/user/login')
        }
      })

    vm.addGoal = function (exer) {
      var goalExer = {
        name: exer.name,
        _id: exer._id
      }
      vm.goals[exer.name] = goalExer;
    }

    vm.postGoals = function () {
      var additions = {}
      additions.goals = vm.goals;
      additions.goalWeight = vm.goalWeight;

      $http
        .post('/api/goals/goals', additions)
        .then(function (data) {
          console.log(data.data)
        }, function (err) {
          console.log(err)
          if (err.data.redirect === true) {
            $location.path('/user/login')
          }
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
