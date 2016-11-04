/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.maps')
      .controller('GmapPageCtrl', GmapPageCtrl);

  /** @ngInject */
  function GmapPageCtrl($timeout,$scope,$q,$http) {
    function initialize() {
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

      var mapCanvas = document.getElementById('google-maps');
      var mapOptions = {
        //center: new google.maps.LatLng(0, -180),
        //zoom: 8,
        mapTypeId: google.maps.MapTypeId.HYBRID
      };
      var map = new google.maps.Map(mapCanvas, mapOptions);

        $scope.getRunData('/fitnessActivities/890479816')
        .then(function(data){
          $scope.path = data.path
          var i;
          var bounds = new google.maps.LatLngBounds();
          for(i = 0; i < $scope.path.length; i++){
            $scope.path[i].lat = $scope.path[i]['latitude'];
            delete $scope.path[i].latitude;
            $scope.path[i].lng = $scope.path[i]['longitude'];
            delete $scope.path[i].longitude;
            bounds.extend($scope.path[i]);
          }
          var flightPath = new google.maps.Polyline({
            path: $scope.path,
            geodesic: true,
            strokeColor: '#209E91',
            strokeOpacity: 1.0,
            strokeWeight: 3
          });
          map.fitBounds(bounds);
          flightPath.setMap(map);
        });


    }

    $timeout(function(){
      initialize();
    }, 100);
  }

})();
