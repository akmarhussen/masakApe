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
});