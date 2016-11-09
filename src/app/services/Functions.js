'use strict';


angular.module('Services')
  .factory('Functions', function($http,$q,$uibModal,$rootScope) {
    var Functions = {data:{}};
    Functions.OpenModal = function(modalname,size,data,controller,options){
      var default_options = {
       animation: true,
       templateUrl: modalname,
       controller: controller,
       size: size,
       resolve: {
         items: function () {
           return data;
         }
       }
     };
     default_options = _.assign(default_options,options);
      var modalInstance = $uibModal.open(default_options);
     modalInstance.result.then(function (selectedItem) {
       //console.log(selectedItem);
     }, function () {
       console.log('done');
     });
  }
  return Functions;
});
