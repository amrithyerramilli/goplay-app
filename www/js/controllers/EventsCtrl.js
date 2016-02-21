angular.module('goplay.controllers')
    .controller('EventsCtrl', function($scope, $rootScope, $log, dataFactory, $ionicPopup, $timeout) {
        $scope.tag = "";
        $scope.eventFeed = [];
        $scope.searchTerm = "";

        $scope.$on('$ionicView.enter', function() {
            if (!$scope.tag && dataFactory.getTag()) {
                $scope.tag = dataFactory.getTag()
                $scope.searchTerm = $scope.tag;
            };
            if ($scope.eventFeed.length == 0) {
                getEvents();
            }
        });

        function getEvents(force) {
            dataFactory.getEvents(force).then(function(response) {
                var allEvents = response;
                var filteredEvents = [];

                for (var i = 0; i < allEvents.length; i++) {
                    var event = allEvents[i];

                    event.event.fromDate = moment(event.event.fromDate).toDate();
                    event.event.toDate = moment(event.event.toDate).toDate();

                    filteredEvents.push(event);
                }

                $scope.eventFeed = filteredEvents;

            }, function(err) {
                $log.error(err);
            }).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
        $scope.getEvents = getEvents;

        $scope.joinEvent = joinEvent;

        function joinEvent(eventFeed) {
            console.log(event);
            $scope.selectedEvent = eventFeed.event;

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<ion-list><ion-radio ng-repeat="team in selectedEvent.teams" ng-model="selectedEvent.teamSelected" ng-value="team">{{ team.name }}</ion-radio></ion-list>',
                title: 'Join ' + $scope.selectedEvent.name,
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
                                var pars = {
                                    eventId: $scope.selectedEvent._id,
                                    teamId: $scope.selectedEvent.teamSelected._id,
                                    userId: dataFactory.getUser()._id
                                }
                                dataFactory.joinEvent(pars).then(function(response) {
                                    getEvents(true);
                                }, function(err) {

                                })
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
    });
