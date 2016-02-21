angular.module('goplay.controllers')
    .controller('PeopleCtrl', function($scope, $rootScope, $log, dataFactory, $state, $ionicLoading) {
        $scope.people = [];

        $scope.$on('$ionicView.enter', function() {
            $ionicLoading.show({ template: '<ion-spinner></ion-spinner>' });
            if ($scope.people.length == 0) {
                // $scope.people = getPeopleFeed();
                dataFactory.getPeople().then(function(response) {
                    var allPeople = response;
                    var filteredPeople = [];

                    for (var i = 0; i < allPeople.length; i++) {
                        var person = allPeople[i];
                        filteredPeople.push(person);
                    }
                    $scope.people = filteredPeople;
                }, function(err) {
                    $log.error(err);
                }).finally(function(){
                    $ionicLoading.hide();
                })
            }
        });

        $scope.goToProfile = goToProfile;

        function goToProfile(person) {
            console.log(person);
            $state.go('profile', { userId: person._id });
        }        
    })
