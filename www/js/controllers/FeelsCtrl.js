angular.module('goplay.controllers')
    .controller('FeelsCtrl', function($scope, $rootScope, $ionicModal, $timeout, $log, $state, apiService, dataFactory) {
        $scope.categories = [];
        // $scope.vm = {};
        $scope.searchTerm = null;
        $scope.selectCategory = function(category) {
            dataFactory.setCategory(category);
            $state.go('play.discover.events');
        }

        $scope.$on('$ionicView.enter', function() {
            if ($scope.categories.length == 0)
                $scope.categories = dataFactory.getCategories();
        });

        // on refresh
        // fetch new sports
    });
