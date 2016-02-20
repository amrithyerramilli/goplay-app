// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('goplay', ['ionic', 'goplay.controllers'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $timeout) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    //     $ionicLoading.show({ template: '<ion-spinner></ion-spinner>' });
    //     $timeout(function() {
    //         $ionicLoading.hide();
    //     }, 1000);
    // });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('feels', {
            url: '/feels',
            templateUrl: 'templates/feels.html',
            controller: 'FeelsCtrl'
        })
        .state('play', {
            url: '/play',
            abstract: true,
            templateUrl: 'templates/play.html', // side menu
            // controller:'PlayCtrl'
        })
        .state('play.discover', {
            url: '/discover',
            abstract: true,
            views: {
                'menuContent': {
                    templateUrl: 'templates/discover.html' // tabs
                }
            }
        })
        .state('play.discover.people', {
            url: '/people',
            views: {
                'tab-people': {
                    templateUrl: 'templates/discover-people.html',
                    controller: 'PeopleCtrl'
                }
            }
        })
        .state('play.discover.events', {
            url: '/events',
            views: {
                'tab-events': {
                    templateUrl: 'templates/discover-events.html',
                    controller: 'EventsCtrl'
                }
            }
        })
        .state('profile', {
            url: '/profile/:userId',
            templateUrl: 'templates/profile.html',
            controller: 'ProfileCtrl'
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/feels');
});

angular.module('goplay.services', []);
angular.module('goplay.controllers', ['goplay.services']);
