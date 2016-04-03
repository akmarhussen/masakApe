angular.module('starter.controllers', [])

.controller('CuisineController', function($scope, cuisineServices){
	$scope.show = function(){
		cuisineServices.getAll().success(function(data){
			$scope.cuisines = data;
		});
	};
	$scope.show();
})

.controller('OccasionController', function($scope, occasionServices){
	$scope.show = function(){
		occasionServices.getAll().success(function(data){
			$scope.occasions = data;
		});
	};
	$scope.show();
})

.controller('MainCtrl', function($scope, $ionicHistory) {
	$scope.myGoBack = function() {
	    $ionicHistory.goBack();
	};
})

.controller('IonAutocompleteController', function ($scope, $http) {
    $scope.model = "";
    $scope.clickedValueModel = "";
    $scope.removedValueModel = "";
    $scope.getTestItems = function (query, isInitializing) {
        if (isInitializing) {
            return null;
        } else {
            return $http.get('http://api.thebucketdev.com/masakape/ingredient/getAll.php');
        }
    };
    $scope.itemsClicked = function (callback) {
        $scope.clickedValueModel = callback;
    };
    $scope.itemsRemoved = function (callback) {
        $scope.removedValueModel = callback;
    };
})

.controller('IngredientController', function($scope, ingredientServices) {
 	$scope.show = function(){
		ingredientServices.getAll().success(function(data){
			$scope.ingredients = data;
		});
	};
	$scope.show();
})


.controller('recipeController', function($scope, $stateParams, recipeServices) {
 	$scope.show = function(){
		recipeServices.getBestRecipe().success(function(data){
			$scope.recipes = data;
		});
	};
	$scope.show();

	$scope.showRecipeId = function() {
      recipeServices.getId($stateParams.recipeId).success(function(recipe) {
            $scope.recipeDetail = recipe;
        });   
    };
    $scope.showRecipeId();

    $scope.showRecipeIngredient = function() {
      recipeServices.getRecipeIngredient($stateParams.recipeId).success(function(recipe) {
            $scope.recipeIngredients = recipe;
        });   
    };
    $scope.showRecipeIngredient();
})

.controller('findRecipeController', function($scope, findRecipeServices, InputCuisine, InputOccasion, InputIngredient) {
 	// $scope.userCuisine=[];
 	$scope.userCuisine = InputCuisine;
 	$scope.userOccasion = InputOccasion;
 	$scope.ingredient = InputIngredient;

	$scope.toggleSelection = function toggleSelection(cuisine) {
	    $idx = $scope.userCuisine.indexOf(cuisine);

	    // is currently selected
	    if ($idx > -1) {
	      $scope.userCuisine.splice($idx, 1);
	    }

	    // is newly selected
	    else {
	      $scope.userCuisine.push(cuisine);
	    }
	    console.log($scope.userCuisine);
	};
	$scope.toggleOccasion = function toggleOccasion(occasion) {
	    $scope.userOccasion.pop();
	    $scope.userOccasion.push(occasion);
	    console.log($scope.userOccasion);
	};
    $scope.findRecipe = function findRecipe(){
        findRecipeServices.findRecipe({
            cuisine: $scope.userCuisine,
            occasion: $scope.userOccasion,
            ingredient: $scope.ingredient.name
        }).success(function(data){
            $scope.foundRecipe = data;
        });
    };
    $scope.findRecipe();
});