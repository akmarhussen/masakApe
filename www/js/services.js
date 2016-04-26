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
})

.factory('recipeServices', function($http) {
    var baseUrl = 'http://api.thebucketdev.com/masakape/recipe/';
    return {
        getBestRecipe: function(bestRecipe) {
            return $http.post(baseUrl+'getBestRecipe.php',bestRecipe,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        getBestRecipeBm: function(bestRecipe) {
            return $http.post(baseUrl+'getBestRecipeBm.php',bestRecipe,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        getId: function (recipeId){
            return $http.get(baseUrl+'get.php?recipeId='+recipeId); 
        },
        getRecipeIngredient: function (recipeId){
            return $http.get(baseUrl+'getRecipeIngredient.php?recipeId='+recipeId); 
        },
        getFavRecipe: function (recipeId){
            return $http.post(baseUrl+'getFavRecipe.php',recipeId,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        saveRating: function (rating){
            return $http.post(baseUrl+'saveRating.php',rating,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        saveReview: function (rating){
            return $http.post(baseUrl+'saveReview.php',rating,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        getReview: function (recipeId){
            return $http.get(baseUrl+'getReview.php?recipeId='+recipeId); 
        }
    };
})

.factory('feedbackServices', function($http) {
    var baseUrl = 'http://api.thebucketdev.com/masakape/';
    return {
        sendFeedback: function (feedback){
            return $http.post(baseUrl+'feedback.php',feedback,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        }
    };
})

.factory('findRecipeServices', function($http) {
    var baseUrl = 'http://api.thebucketdev.com/masakape/recipe/';
    return {
        findRecipe: function (userCuisine){
            return $http.post(baseUrl+'findRecipe.php',userCuisine,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        findRecipeBm: function (userCuisine){
            return $http.post(baseUrl+'findRecipeBm.php',userCuisine,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        }
    };
})

.factory('InputCuisine', function() {
    inputCuisine = [];
    return inputCuisine;
})

.factory('InputOccasion', function() {
    inputOccasion = [];
    return inputOccasion;
})

.factory('InputIngredient', function() {
    inputIngredient = [];
    return inputIngredient;
})

.factory('InputSearch', function() {
    inputSearch = "exact";
    return inputSearch;
})

.factory('InputCuisineBm', function() {
    inputCuisineBm = [];
    return inputCuisineBm;
})

.factory('InputOccasionBm', function() {
    inputOccasionBm = [];
    return inputOccasionBm;
})

.factory('InputIngredientBm', function() {
    inputIngredientBm = [];
    return inputIngredientBm;
})

.factory('InputSearchBm', function() {
    inputSearchBm = "exact";
    return inputSearchBm;
})

.factory('InputTopRecipe', function() {
    InputTopRecipe = "10";
    return InputTopRecipe;
})

.factory('FavouriteRecipe', function() {
    FavouriteRecipe = [];
    return FavouriteRecipe;
})

.factory('FilterCuisine', function() {
    filterCuisine = [];
    return filterCuisine;
})

.factory('FilterOccasion', function() {
    filterOccasion = [];
    return filterOccasion;
});