angular.module('goplay.controllers')
    .controller('EventsCtrl', function($scope, $rootScope, $log, dataFactory, $ionicPopup, $timeout) {
        $scope.category = null;
        $scope.eventFeed = [];
        $scope.searchTerm = "";

        $scope.$on('$ionicView.enter', function() {
            if (!$scope.category && dataFactory.getCategory())
                $scope.category = dataFactory.getCategory();
            if ($scope.eventFeed.length == 0) {
                $scope.eventFeed = getEventsFeed();
            }
        });

        $scope.joinEvent = joinEvent;

        function joinEvent(eventFeed) {
            console.log(event);
            $scope.selectedEvent = eventFeed.event;

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<ion-list><ion-radio ng-repeat="team in selectedEvent.teams" ng-model="selectedEvent.teamSelected" ng-value="team">{{ team.name }}</ion-radio></ion-list>',
                title: 'Join ' + $scope.selectedEvent.title,
                scope: $scope,
                buttons: [
                    { text: 'Cancel' }, {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.selectedEvent.teamSelected) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.selectedEvent.teamSelected;
                            }
                        }
                    }
                ]
            });

            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });            
        };

        function getEventsFeed() {
            var allEvents = dataFactory.getEvents();
            var filteredEvents = [];


            for (var i = 0; i < allEvents.length; i++) {
                var event = allEvents[i];
                event.event.distance = "1.5";
                event.event.fromDate = moment(event.event.fromDate).toDate();
                event.event.toDate = moment(event.event.toDate).toDate();

                filteredEvents.push(event);
            }

            return filteredEvents;
        }

    });
