/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.tables')
        .controller('RunningPageCtrl', TablesPageCtrl);

    /** @ngInject */
    function TablesPageCtrl($scope, $filter, $http, $q, editableOptions, editableThemes, baConfig) {
      var layoutColors = baConfig.colors;
      $scope.colors = [layoutColors.primary, layoutColors.warning, layoutColors.danger, layoutColors.info, layoutColors.success, layoutColors.primaryDark];
        $scope.runData = [];
        $scope.getRunData = function(url){
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'https://jfsapp.com/Open/API/Dashboard/Nike',
                data: {
                    url: url
                }
            }).then(function(data) {
                deferred.resolve(data.data);
            }, function(error) {
                deferred.reject(error);
            })
            return deferred.promise;
        }
        $scope.lineData = [
          {y: "2006", a: 100, b: 90},
          {y: "2007", a: 75, b: 65},
          {y: "2008", a: 50, b: 40},
          {y: "2009", a: 75, b: 65},
          {y: "2010", a: 50, b: 40},
          {y: "2011", a: 75, b: 65},
          {y: "2012", a: 100, b: 90}
        ];
        $scope.getAllData = function(url){
          $scope.getRunData(url)
                .then(function(data){
                                  angular.extend($scope.runData,data.items);
                                  console.log($scope.runData);
                                  //if(data.items.length >=25){
                                  //  $scope.getAllData(data.next)
                                //  }

                                });

        }
        $scope.getAllData("/fitnessActivities");


    }
})();
