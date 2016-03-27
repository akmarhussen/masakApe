angular.module('starter.services', [])

.factory('cuisineServices', function($http) {
    var baseUrl = 'http://api.thebucketdev.com/masakape/cuisine/';
    return {
        getAll: function() {
            return $http.get(baseUrl+'getAll.php');
        },
        getId: function (id){
            return $http.get(baseUrl+'get.php?id='+id); 
        },
        create: function (cuisine){
            return $http.post(baseUrl+'add.php',cuisine,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        update: function (cuisine){
            return $http.post(baseUrl+'update.php',cuisine,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        delete: function  (id){
            return $http.get(baseUrl+'delete.php?id='+id);
        }
    };
})

.factory('occasionServices', function($http) {
    var baseUrl = 'http://api.thebucketdev.com/masakape/occasion/';
    return {
        getAll: function() {
            return $http.get(baseUrl+'getAll.php');
        },
        getId: function (id){
            return $http.get(baseUrl+'get.php?id='+id); 
        },
        create: function (cuisine){
            return $http.post(baseUrl+'add.php',cuisine,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        update: function (cuisine){
            return $http.post(baseUrl+'update.php',cuisine,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        delete: function  (id){
            return $http.get(baseUrl+'delete.php?id='+id);
        }
    };
})

.factory('ingredientServices', function($http) {
    var baseUrl = 'http://api.thebucketdev.com/masakape/ingredient/';
    return {
        getAll: function() {
            return $http.get(baseUrl+'getAll.php');
        },
        getId: function (id){
            return $http.get(baseUrl+'get.php?id='+id); 
        },
        create: function (cuisine){
            return $http.post(baseUrl+'add.php',cuisine,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        update: function (cuisine){
            return $http.post(baseUrl+'update.php',cuisine,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        delete: function  (id){
            return $http.get(baseUrl+'delete.php?id='+id);
        }
    };
});