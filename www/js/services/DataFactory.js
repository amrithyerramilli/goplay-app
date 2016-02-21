angular.module('goplay.services')
    .factory('dataFactory', function($rootScope, $q, $timeout, $http, $log) {
        var _user = null;
        var _tag = null;
        var _tags = ["Football", "Badminton", "Tennis", "Cricket", "Badass"];
        // var baseUrl = "http://inmobi.southcentralus.cloudapp.azure.com:9000";
        var baseUrl = "http://localhost:8100"
        var _events = [];
        var _people = [];
        // var _events = [{
        //     event: {
        //         title: "Footy",
        //         fromDate: "2016-02-20 11:30",
        //         toDate: "2016-02-20 12:30",
        //         location: {
        //             name: "Mad Park",
        //             latitude: 12.1234,
        //             longitude: 78.1234
        //         },
        //         teams: [{
        //             _id: "123",
        //             name: "World XI",
        //             owner: "AY",
        //             userIds: ["Farhan", "Anirudh"]
        //         }, {
        //             _id: "345",
        //             name: "Gully XI",
        //             owner: "AvK",
        //             userIds: ["Amrith"]
        //         }]
        //     },
        //     feeds: [{
        //         title: "Join me for #Footy",
        //         media: "https://images.unsplash.com/photo-1420316078344-6149cb82b2c7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=8071a7058d24833166bc03a57ac88537",
        //         mimeType: "jpeg"
        //     }, {
        //         title: "I'm playing #Footy at Mad Park today!",
        //         media: "https://images.unsplash.com/photo-1451256656121-9ffc0c898a49?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=bd85d7b034f17939d21da8094ffd347e",
        //         mimeType: "jpeg"
        //     }]
        // }, {
        //     event: {
        //         title: "Pro Football",
        //         fromDate: "2016-02-21 11:30",
        //         toDate: "2016-02-23 11:30",
        //         location: {
        //             name: "Decathlon",
        //             latitude: 12.1234,
        //             longitude: 78.1234
        //         },
        //         teams: [{
        //             _id: "123",
        //             name: "World XI",
        //             owner: "AY",
        //             userIds: ["Farhan", "Anirudh"]
        //         }, {
        //             _id: "345",
        //             name: "Gully XI",
        //             owner: "AvK",
        //             userIds: ["Amrith"]
        //         }]
        //     },
        //     feeds: [{
        //         title: "Join me for #Footy",
        //         media: "https://images.unsplash.com/photo-1420316078344-6149cb82b2c7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=8071a7058d24833166bc03a57ac88537",
        //         mimeType: "jpeg"
        //     }, {
        //         title: "I'm playing #Footy at Mad Park today!",
        //         media: "https://images.unsplash.com/photo-1451256656121-9ffc0c898a49?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=bd85d7b034f17939d21da8094ffd347e",
        //         mimeType: "jpeg"
        //     }]
        // }];

        // var _people = [{
        //     id: "123",
        //     name: "Farhan",
        //     latitude: "123.123",
        //     longitude: "456.789",
        //     distance: "1.5",
        //     status: "Making the geo APIs"
        // }, {
        //     id: "456",
        //     name: "Anirudh",
        //     latitude: "123.123",
        //     longitude: "456.789",
        //     distance: "3",
        //     status: "The stupid unstructured API"
        // }, {
        //     id: "789",
        //     name: "Amrith",
        //     latitude: "123.123",
        //     longitude: "456.789",
        //     distance: "1",
        //     status: "This fag app"
        // }];

        function getTag() {
            return _tag;
        }

        function setTag(tag) {
            _tag = tag;
        }

        function getTags() {
            return _tags;
        }

        function setTags(tags) {
            _tags = tags;
        }

        function addTag(tag) {
            _tags.push(category);
        }

        function getEvents(force) {
            var p = $q.defer();
            if (_events.length == 0 || force) {
                $http.get(baseUrl + "/event/list", { params: { latitude: _user.location.latitude, longitude: _user.location.longitude } }).then(function(response) {
                    _events = response.data.data;
                    console.log(_events);
                    p.resolve(_events);
                }, function(err) {
                    $log.error(err);
                });
            } else {
                p.resolve(_events);
            }
            return p.promise;
        }

        function getPeople() {
            var p = $q.defer();

            if (_people.length == 0) {
                $http.get(baseUrl + "/user/list").then(function(response) {
                    _people = response.data.data;
                    console.log(_people);
                    p.resolve(_people);
                }, function(err) {
                    $log.error(err);
                });
            } else {
                p.resolve(_people);
            }
            return p.promise;
        }

        function getPerson(id) {
            for (var i = 0; i < _people.length; i++) {
                var person = _people[i];
                if (person._id == id)
                    return person;
            }
            return null;
        }

        function loginUser(model) {

            var x = $q.defer();
            $http.get(baseUrl + "/user/" + model.username, { params: { latitude: model.latitude, longitude: model.longitude } }).then(function(response) {
                _user = response.data.data;
                console.log(_user);
                x.resolve(_user);
                getPeople();
            }, function(error) {
                $log.error(err);
            });

            return x.promise;
        }

        function getUser() {
            return _user;
        }

        function joinEvent(data) {
            // eventId
            // teamId
            // userId
            var x = $q.defer();
            $http.get(baseUrl + "/event/join", { params: data }).then(function(response) {
                $log.log(response);
            }, function(error) {
                $log.error(error);
            });
            return x.promise;
        }

        return {
            getTag,
            setTag,
            getTags,
            setTags,
            getEvents,
            getPeople,
            getPerson,
            loginUser,
            getUser,
            joinEvent
        }
    })
