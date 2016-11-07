/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.running')
        .controller('RunningPageCtrl', TablesPageCtrl);

    /** @ngInject */
    function TablesPageCtrl($scope,$timeout, $filter, $http, $q, editableOptions, editableThemes, baConfig,Running) {
        var layoutColors = baConfig.colors;
        $scope.smartTablePageSize = 10;
        $scope.MonthDisplay={key:['Month_Runs'],title:'Number of Runs'}
        $scope.changeMonthView = function() {
            var temp = $scope.RunsByMonth;
            //console.log('change')
            //$scope.RunsByMonth = null;
          }
        $scope.round = function(x){
          return 'y'
        }
        $scope.colors = [layoutColors.primary, layoutColors.warning, layoutColors.danger, layoutColors.info, layoutColors.success, layoutColors.primaryDark];
        $scope.runData = [];
        $scope.getRunData = function(url) {
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

        Running.getRunDataAll().then(function(data) {
          $scope.allRuns = data;
          console.log(data);
        });
        Running.getRunDataMonth().then(function(data) {
            $scope.RunsByMonth = data;
            //console.log(data)
            $scope.areaLineData = {
                labels: [],
                series: [
                    []

                ]
            };
            angular.forEach(data, function(value, key) {
                $scope.areaLineData.labels.push(value.Label);
                $scope.areaLineData.series[0].push(value.Month_Runs);
            });
            //console.log($scope.areaLineData.labels)
            new Chartist.Line('#area-chart', $scope.areaLineData, $scope.areaLineOptions);
        })
        $scope.getAllData = function(url) {
            $scope.getRunData(url)
                .then(function(data) {
                    angular.extend($scope.runData, data.items);
                    //console.log($scope.runData);
                    //if(data.items.length >=25){
                    //  $scope.getAllData(data.next)
                    //  }

                });

        }
        $scope.getAllData("/fitnessActivities");
        $scope.areaLineData = {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
                [5, 9, 7, 8, 5, 3, 5, 4]
            ]
        };
        $scope.areaLineOptions = {
            fullWidth: true,
            height: "300px",
            low: 0,
            showArea: true
        };

    }
})();
