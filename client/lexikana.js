angular.module('lexikana', [
  'lexikana.logo',
  'lexikana.signin',
  'lexikana.rw',
  'lexikana.services',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl:'rw/rw.html',
        controller:'rwCtrl'
      })
      .when('/signin', {
        templateUrl: 'login/login.html',
        controller: 'SigninCtrl'
      })
      .otherwise({
        redirectTo: '/'
      })
  })
  .run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function (evt, next, current) {
      if (next.$$route) {
        $location.path('/');
      }

    });
  });
