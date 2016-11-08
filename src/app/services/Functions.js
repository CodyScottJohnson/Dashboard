'use strict';


angular.module('Services',[])
  .factory('Functions', function($http,$q,$uibModal,$rootScope) {
    var Functions = {data:{}};
    Functions.OpenModal = function(modalname,size,data,options){
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
    return Functions;
  });
