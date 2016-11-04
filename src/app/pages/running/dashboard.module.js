/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.running', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard2', {
          url: '/dashboard2',
          templateUrl: 'app/pages/running/dashboard.html',
          title: 'Dashboard2',
          controller:'RunningPageCtrl',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 10,
          },
        });
  }

})();
