angular.module('goplay.controllers')
    .controller('PeopleCtrl', function($scope, $rootScope, $log, dataFactory) {
        $scope.people = [];

        $scope.$on('$ionicView.enter', function() {

            if ($scope.people.length == 0) {
                $scope.people = getPeopleFeed();
            }
        });

        function getPeopleFeed() {
        	var allPeople = dataFactory.getPeople();
            var filteredPeople = [];


            for (var i = 0; i < allPeople.length; i++) {
                var person = allPeople[i];                
                filteredPeople.push(person);
            }

            return filteredPeople;
        }
    })
