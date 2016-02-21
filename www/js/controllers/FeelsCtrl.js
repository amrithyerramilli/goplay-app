angular.module('goplay.controllers')
    .controller('FeelsCtrl', function($scope, $rootScope, $ionicModal, $timeout, $log, $state, apiService, dataFactory) {
        $scope.tags = [];
        // $scope.vm = {};
        $scope.searchTerm = "";
        $scope.selectTag = function(tag) {
            dataFactory.setTag(tag);
            $state.go('play.discover.events');
        }

        $scope.$on('$ionicView.enter', function() {
            if ($scope.tags.length == 0)
                $scope.tags = dataFactory.getTags();
        });

        // on refresh
        // fetch new sports
    });
