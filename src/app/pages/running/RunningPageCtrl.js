/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.running')
        .controller('RunningPageCtrl', TablesPageCtrl);

    /** @ngInject */
    function TablesPageCtrl($scope,$timeout, $filter, $http, $q, editableOptions, editableThemes, baConfig,Running,Functions) {
        var layoutColors = baConfig.colors;
        $scope.smartTablePageSize = 10;
        $scope.MonthDisplay={key:['Month_Runs'],title:'Number of Runs'}
        $scope.changeMonthView = function() {
            var temp = $scope.RunsByMonth;
            //console.log('change')
            //$scope.RunsByMonth = null;
          }
        $scope.colors = [layoutColors.primary, layoutColors.warning, layoutColors.danger, layoutColors.info, layoutColors.success, layoutColors.primaryDark];
        $scope.showRunDetail = function(runID){
          Running.getSpecificRuns([runID]).then(function(data){
            Functions.OpenModal("app/pages/running/modals/rundetail/rundetail.html",'lg',data,'RunDetailCtrl',{windowClass:'notification_modal'});
          });
        }
        $scope.runData = [];

        Running.getRunDataAll().then(function(data) {
          $scope.allRuns = data;
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
        $scope.hideAxes = function(x) { return ''; };
        $scope.updateAll = function(){
          Running.updateAllFromSource().then(function(data){
            Running.updateDetailFromSource();
            Running.getRunDataMonth().then(function(data) {
                $scope.RunsByMonth = data;
            })
          Running.getRunDataAll().then(function(data) {
              $scope.allRuns = data;
              console.log(data);
            });
          })
        }
    }
})();
