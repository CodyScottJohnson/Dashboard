angular.module('Services')
  .controller('RunDetailCtrl', function ($scope,$uibModalInstance,items,$sce) {
    $scope.items=items;
    $scope.CloseModal = function () {
        $uibModalInstance.dismiss('cancel');
      };
  });
