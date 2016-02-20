angular.module('goplay.controllers')
    .controller('ProfileCtrl', function($scope, $stateParams, dataFactory) {
        $scope.selectedUserId = null;
        $scope.profile = null;

        $scope.$on('$ionicView.enter', function() {
            console.log($stateParams);
            if (!$scope.selectedUserId) {

                $scope.selectedUserId = $stateParams.userId;
                $scope.profile = dataFactory.getPerson($scope.selectedUserId);
            }

        });
    });
