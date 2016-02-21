angular.module('goplay.controllers')
    .controller('CreateCtrl', function($scope, $ionicModal, $timeout, $state, $stateParams, $rootScope, dataFactory) {
        $scope.selectedPlace = {};

        $scope.$on('$ionicView.enter', function() {
            var allPlaces = $rootScope.selectedPlaces || [];
            var placeId = $stateParams.id;
            $scope.selectedPlace = {};
            for (var i = 0; i < allPlaces.length; i++) {
                var place = allPlaces[i];
                if (place.id == placeId)
                    $scope.selectedPlace = place;
            }

            $scope.vm = {
                name: $scope.selectedPlace.name,
                fromDate: "2016-02-20 11:30",
                toDate: "2016-02-20 5:30",
                people: {
                    min: 2,
                    max: 100,
                    current: 1
                },
                location: {
                	"name" : $scope.selectedPlace.name,
                    latitude: $scope.selectedPlace.geometry.lat,
                    longitude: $scope.selectedPlace.geometry.lng
                },
                range: 10,
                tag : dataFactory.getTag()
            }
        });

        $scope.goBack = function() {
            $state.go('play.map');
        }
        $scope.createEvent = function() {
            var event = $scope.vm;
            event.people.max = parseInt(event.range);
            delete event.range;

            dataFactory.createEvent(event).then(function() {
                $state.go('play.discover.events');
            }, function() {
                $state.go('play.discover.events');
            });
        }
    })
