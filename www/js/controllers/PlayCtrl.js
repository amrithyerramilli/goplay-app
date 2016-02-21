angular.module('goplay.controllers')
    .controller('PlayCtrl', function($scope, dataFactory, $state) {
        $scope.$on('$ionicView.enter', function() {
            $scope.user = dataFactory.getUser();
        });

        $scope.goToProfile = goToProfile;

        function goToProfile(person) {
            $state.go('profile', { userId: person._id });
        }
    });
