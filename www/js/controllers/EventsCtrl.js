angular.module('goplay.controllers')
    .controller('EventsCtrl', function($scope, $rootScope, $log, dataFactory) {
        $scope.category = null;
        $scope.eventFeed = [];
        $scope.searchTerm = null;

        $scope.$on('$ionicView.enter', function() {
            if (!$scope.category && dataFactory.getCategory())
                $scope.category = dataFactory.getCategory();
            if ($scope.eventFeed.length == 0) {
                $scope.eventFeed = getEventsFeed();
            }
        });

        function getEventsFeed() {
            var allEvents = dataFactory.getEvents();
            var filteredEvents = [];


            for (var i = 0; i < allEvents.length; i++) {
                var event = allEvents[i];
                event.event.distance = "1.5";

                filteredEvents.push(event);
            }

            return filteredEvents;
        }

    });
