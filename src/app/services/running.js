'use strict';


angular.module('Services',[])
  .factory('Running', function($http,$q,$uibModal,$rootScope) {
    var Running = {data:{}};
    Running.getRunDataMonth = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'https://jfsapp.com/Open/API/Dashboard/Run/Month/All',
        }).then(function(data) {
            deferred.resolve(data.data);
        }, function(error) {
            deferred.reject(error);
        })
        return deferred.promise;
    }
    Running.getRunDataAll = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'https://jfsapp.com/Open/API/Dashboard/Runs',
        }).then(function(data) {
            deferred.resolve(data.data);
        }, function(error) {
            deferred.reject(error);
        })
        return deferred.promise;
    }
    return Running;
  });
