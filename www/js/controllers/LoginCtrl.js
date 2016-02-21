angular.module('goplay.controllers')
    .controller('LoginCtrl', function($scope, $ionicModal, $timeout, dataFactory, $state, $ionicPlatform, $q) {
        $scope.loginModel = { username: "Anirudh" };
        $scope.login = login;

        function login() {
            getCurrentPosition().then(function(geo) {
                $scope.loginModel.latitude = geo.latitude;
                $scope.loginModel.longitude = geo.longitude;
            }).then(function() {
                return dataFactory.loginUser($scope.loginModel);
            }).then(function(response) {
                $state.go('feels');
            }).catch(function(err) {
                console.log(err);
            });
        }


        function getCurrentPosition() {
            var positionDeferred = $q.defer();
            var posOptions = { timeout: 10000, enableHighAccuracy: false };
            $ionicPlatform.ready(function() {
                $timeout(function() {

                    navigator.geolocation.getCurrentPosition(function(position) {
                        var geo = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        };
                        // var geo = {
                        //     latitude: 12.9667,
                        //     longitude: 77.5667
                        // }
                        positionDeferred.resolve(geo);
                    }, function(response) {
                        alert('geolocation error');
                        console.log(response);
                    })
                }, 100);
            });

            return positionDeferred.promise;
        }
    })
