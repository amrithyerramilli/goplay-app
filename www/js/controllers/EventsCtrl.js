angular.module('goplay.controllers')
    .controller('EventsCtrl', function($scope, $stateParams, $log) {
    	$scope.$on('$ionicView.enter', function() {
            $log.info($stateParams);
        });

        $scope.category = $stateParams.category;
    })
