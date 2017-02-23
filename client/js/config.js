 //  inject the ngRoute dependency in the module.
var myApp = angular.module('myApp', ['ngRoute', 'ngMessages', 'ngResource']);
    //  use the config method to set up routing:
    myApp.config(function ($routeProvider) {
    $routeProvider
    .when('/',{
        templateUrl: 'partials/home.html'
    })
        .when('/bids', {
            templateUrl: 'partials/bids.html',
            controller: 'BidsController'
        })
        .when('/result', {
            templateUrl: 'partials/result.html',
            controller: 'ResultController'
        })
    .otherwise({
      redirectTo: '/'
    });
});