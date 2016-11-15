var wetherApp = angular.module('wetherApp',['ngRoute','ngResource']);

    wetherApp.config(function($routeProvider){
        $routeProvider
        .when('/',{
            templateUrl: 'page/home.html',
            controller: 'mainController'  
        })   
        .when('/forcast',{
            templateUrl: 'page/forcast.html',
            controller: 'forcastController' 
        })
    })
    wetherApp.service('cityService',function(){
        this.city = "Bangalore";
        this.day = 3;
    })
    wetherApp.controller('mainController',['$scope','cityService',function($scope,cityService){
        $scope.city = cityService.city;  
        $scope.day = cityService.day;

        $scope.$watch('city',function(){
            cityService.city = $scope.city;
        })
        $scope.$watch('day', function () {
            cityService.day = $scope.day;
        })
    }]);
    wetherApp.controller('forcastController',['$scope','$resource','cityService',function($scope,$resource,cityService){
        $scope.city = cityService.city;
        $scope.day = cityService.day;
        $scope.weatherAPI=$resource("http://api.openweathermap.org/data/2.5/forecast/daily",{ callback: "JSON_CALLBACK" },{ get: { method: "JSONP" }});
        $scope.wetherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.day, APPID: "9524e5dff8ff8de13a60b34ea84efbc9" });

        $scope.convetTo = function(degK){
            return Math.round((1.8 * (degK - 273)) * 5/9);
        }
        $scope.convertToDate =function(dt){
            return new Date(dt * 1000);
        }
  }]);