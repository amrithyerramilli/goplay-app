angular.module('goplay.controllers')
    .controller('ProfileCtrl', function($log, $scope, $stateParams, dataFactory, $state) {
        $scope.selectedUserId = null;
        $scope.profile = null;
        $scope.feeds = [];

        $scope.goBack = function() {
            $state.go('play.discover.people');
        }
        $scope.gotoAd = function(link) {
            if (link) {
                window.open(link, '_system');
            }
        }

        $scope.$on('$ionicView.enter', function() {
            console.log($stateParams);
            $scope.selectedUserId = $stateParams.userId;
            $scope.profile = dataFactory.getPerson($scope.selectedUserId);
            dataFactory.getUserFeeds($scope.selectedUserId).then(function(response) {
                $scope.feeds = response.data.data;
            }, function(error) {
                $log.error(error);
            });

        });
    });
