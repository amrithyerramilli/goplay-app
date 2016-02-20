angular.module('goplay.controllers')
    .controller('LoginCtrl', function($scope, $ionicModal, $timeout, dataFactory, $state) {
        $scope.loginModel = {};
        $scope.login = login;

        function login() {
            
            $scope.loginModel.latitude = 123.456;
            $scope.loginModel.longitude = 123.456;

            dataFactory.loginUser($scope.loginModel).then(function(response) {
                $state.go('feels');
            }, function(error) {
                console.log(error);
            })
        }
    })
