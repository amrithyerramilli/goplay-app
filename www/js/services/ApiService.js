angular.module('goplay.services')
    .factory('apiService', function($http) {
        var baseUrl = "";

        function getCategories() {
            return $http.get(baseUrl + "/sports");
        }
        return{
        	getCategories : getCategories
        }
    })
