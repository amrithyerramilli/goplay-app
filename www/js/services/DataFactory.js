angular.module('goplay.services')
    .factory('dataFactory', function($rootScope) {
        var _user = null;
        var _category = null;
        var _categories = ["Football", "Badminton", "Tennis", "Cricket", "Badass"];
        var _events = [{
            event: {
                title: "Footy",
                fromDate: moment("2016-02-20 11:30"),
                toDate: moment("2016-02-20 12:30"),
                location: {
                    name: "Mad Park",
                    latitude: 12.1234,
                    longitude: 78.1234
                },
            },
            feeds: [{
                title: "Join me for #Footy",
                media: "https://images.unsplash.com/photo-1420316078344-6149cb82b2c7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=8071a7058d24833166bc03a57ac88537",
                mimeType: "jpeg"
            }, {
                title: "I'm playing #Footy at Mad Park today!",
                media: "https://images.unsplash.com/photo-1451256656121-9ffc0c898a49?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=bd85d7b034f17939d21da8094ffd347e",
                mimeType: "jpeg"
            }]
        }, {
            event: {
                title: "Pro Football",
                fromDate: moment("2016-02-21 11:30"),
                toDate: moment("2016-02-23 11:30"),
                location: {
                    name: "Decathlon",
                    latitude: 12.1234,
                    longitude: 78.1234
                }
            },
            feeds: [{
                title: "Join me for #Footy",
                media: "https://images.unsplash.com/photo-1420316078344-6149cb82b2c7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=8071a7058d24833166bc03a57ac88537",
                mimeType: "jpeg"
            }, {
                title: "I'm playing #Footy at Mad Park today!",
                media: "https://images.unsplash.com/photo-1451256656121-9ffc0c898a49?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=bd85d7b034f17939d21da8094ffd347e",
                mimeType: "jpeg"
            }]
        }];

        var _people = [{
            id: "123",
            name: "Farhan",
            latitude: "123.123",
            longitude: "456.789",
            distance: "1.5",
            status: "Making the geo APIs"
        }, {
            id: "456",
            name: "Anirudh",
            latitude: "123.123",
            longitude: "456.789",
            distance: "3",
            status: "The stupid unstructured API"
        }, {
            id: "789",
            name: "Amrith",
            latitude: "123.123",
            longitude: "456.789",
            distance: "1",
            status: "This fag app"
        }];

        function getCategory() {
            return _category;
        }

        function setCategory(category) {
            _category = category;
        }

        function getCategories() {
            return _categories;
        }

        function setCategories(categories) {
            _categories = categories;
        }

        function addCategory(category) {
            _categories.push(category);
        }

        function getEvents() {
            return _events;
        }

        function getPeople() {
            return _people;
        }

        return {
            getCategory,
            setCategory,
            getCategories,
            setCategories,
            getEvents,
            getPeople
        }
    })
