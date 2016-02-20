angular.module('goplay.controllers')
    .controller('FeelsCtrl', function($scope, $ionicModal, $timeout, $log, $state, apiService) {
        $scope.categories = ["Football", "Badminton", "Tennis", "Cricket", "Badass"];
        $scope.vm = {};
        $scope.vm.searchTerm = null;
        $scope.vm.selectedCategory = null;
        $scope.selectCategory = function(category) {
            $scope.vm.selectedCategory = category;
        }

        $scope.$watch('vm.selectedCategory', function(newValue, oldValue, scope) {
            $log.info("oldValue : " + oldValue);
            $log.info("newValue : " + newValue);

            $state.go('play.discover.events', { category: $scope.vm.selectedCategory });
        }, true);

        $scope.$on('$ionicView.enter', function() {
            if ($scope.categories.length == 0) {
                apiService.getCategories().then(function(response) {
                    $scope.categories = response;
                }, function(error) {
                    $log.error(error);
                });
            }
        });

        // on refresh
        // fetch new sports
    });
