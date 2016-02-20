angular.module('goplay.controllers')
    .controller('PlayCtrl', function($scope, dataFactory,$state) {
        $scope.user = dataFactory.getUser();
        $scope.goToProfile = goToProfile;

        function goToProfile(person) {
            $state.go('profile', { userId: person.id });
        }
    });
