angular.module('goplay.controllers')
    .controller('MapCtrl', function($ionicPlatform, $timeout, $scope, $rootScope, $q, $state, dataFactory, $log) {
        $scope.refresh = function() {
            $state.go($state.current, {}, {reload: true});
        }
        $scope.$on('$ionicView.enter', function(e) {
            $scope.$broadcast('show-loader');
            var selectedPlaces = []; // get places

            dataFactory.getNearbyPlaces().then(function(response) {
                selectedPlaces = response.data.resDet;
                $rootScope.selectedPlaces = selectedPlaces;
                initMap();
                placeMarkers();
                $scope.$broadcast('scroll.refreshComplete');
            }, function(error) {
                $log.error(error);
            })

            $scope.geolocation = dataFactory.getUser().location;

            function initMap() {
                var latLng = new google.maps.LatLng($scope.geolocation.latitude, $scope.geolocation.longitude);
                var mapOptions = {
                    center: latLng,
                    zoom: 11,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
                $scope.map.setCenter(latLng);
                hereMarker(latLng)
            }

            function hereMarker(latLng) {
                var infowindow = new google.maps.InfoWindow();
                var currentMarker = new google.maps.Marker({
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: latLng,
                    icon: "https://www.montclair.edu/media/montclairedu/styleassets/images/map/location.png"
                });
                google.maps.event.addListener(currentMarker, 'click', (function(map, marker) {
                    return function() {
                        infowindow.setContent("You are here :)");
                        infowindow.open(map, marker);
                    }
                })($scope.map, currentMarker));
            }

            function placeMarkers() {
                var infowindow = new google.maps.InfoWindow();
                google.maps.event.addListenerOnce($scope.map, 'idle', function() {
                    var infowindow = new google.maps.InfoWindow();
                    var marker, i, place;
                    for (i = 0; i < selectedPlaces.length; i++) {
                        place = selectedPlaces[i];
                        var latLng = new google.maps.LatLng(place.geometry.lat, place.geometry.lng);

                        marker = new google.maps.Marker({
                            map: $scope.map,
                            animation: google.maps.Animation.DROP,
                            position: latLng
                        });

                        google.maps.event.addListener(marker, 'click', (function(map, marker, place, state, scope) {
                            return function() {

                                var placeMarker = '<div style="max-height : 150px; max-width : 250px;"><img src=' + place.photoUrl + ' style="max-height : 100px; max-width : 100px;" /><span id="marker-"' + place.id + '>' + place.name + '</span><div><a href="#/createevent/' + place.id + '">Create Event</a></div></div>'
                                    // var span = "<a href='#'><span id='marker-'" + place.id + ">" + place.name + "</span></a>"
                                infowindow.setContent(placeMarker);
                                infowindow.open(map, marker);
                            }
                        })($scope.map, marker, place, $state, $scope));
                    }

                });
            }

        });
    });
