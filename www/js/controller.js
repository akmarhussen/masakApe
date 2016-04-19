angular.module('starter.controllers', [])

.controller('CuisineController', function($scope, cuisineServices, $ionicLoading){
	$scope.show = function(){
		$ionicLoading.show();
		cuisineServices.getAll().success(function(data){
			$scope.cuisines = data;
			$ionicLoading.hide();
		});
	};
	$scope.show();
})

.controller('OccasionController', function($scope, occasionServices, $ionicLoading){
	$scope.show = function(){
		$ionicLoading.show();
		occasionServices.getAll().success(function(data){
			$scope.occasions = data;
			$ionicLoading.hide();
		});
	};
	$scope.show();
})

.controller('MainCtrl', function($scope, $ionicHistory) {
	$scope.myGoBack = function() {
	    $ionicHistory.goBack();
	};
})

.controller('MenuController', function($scope, $state, $ionicPlatform, $location, $ionicHistory) {
  	$ionicPlatform.registerBackButtonAction(function() {
		if ($location.path() === "/") {
		  navigator.app.exitApp();
		}
		else {
		  $ionicHistory.goBack();
		}
	}, 100);
})

.controller('IngredientController', function($scope, ingredientServices) {
 	$scope.show = function(){
		ingredientServices.getAll().success(function(data){
			$scope.ingredients = data;
		});
	};
	$scope.show();
})


.controller('recipeController', function($scope, $stateParams, recipeServices, InputTopRecipe, $ionicLoading, $ionicModal, CacheFactory, FavouriteRecipe, $state, FilterCuisine, FilterOccasion, ionicToast) {
 	$scope.mySelect = InputTopRecipe;
 	$scope.filterCuisine = FilterCuisine;
 	$scope.filterOccasion = FilterOccasion;

 	if (!CacheFactory.get('favRecipeCache')) {
	 	CacheFactory.createCache('favRecipeCache', {
	 		storageMode: 'localStorage'
	 	});
	}
	var favRecipeCache = CacheFactory.get('favRecipeCache');
	var favRecipe = FavouriteRecipe;
 	
 	$scope.show = function(){
 		$ionicLoading.show();
		recipeServices.getBestRecipe({
            topRecipe: $scope.mySelect
        }).success(function(data){
            $scope.recipes = data;
            $ionicLoading.hide();
        });
	};
	$scope.show();

	$scope.showSelectValue = function(mySelect) {
	    $scope.mySelect = mySelect;
	    $scope.getBestRecipe();
	};

	$scope.getBestRecipe = function getBestRecipe(){
		$ionicLoading.show();
        recipeServices.getBestRecipe({
            topRecipe: $scope.mySelect,
            cuisine: $scope.filterCuisine,
            occasion: $scope.filterOccasion
        }).success(function(data){
            $scope.recipes = data;
            $ionicLoading.hide();
        });
    };

	$scope.showRecipeId = function() {
		if(favRecipeCache.get('fav')){
			favRecipe = favRecipeCache.get('fav');
		}else{
			favRecipe = [];
		}
		
		$scope.favRecipeExists = true;
		for($i=0; $i<favRecipe.length;$i++){
			if(favRecipe[$i]==$stateParams.recipeId){
				$scope.favRecipeExists = false;
			}
		}
      	recipeServices.getId($stateParams.recipeId).success(function(recipe) {
            $scope.recipeDetail = recipe;
        });

        $scope.rating = {};
		$scope.rating.rate = 3;
		$scope.rating.max = 5;
		$scope.readOnly = true;
    };
    $scope.showRecipeId();

    $scope.showRecipeIngredient = function() {
      recipeServices.getRecipeIngredient($stateParams.recipeId).success(function(recipe) {
            $scope.recipeIngredients = recipe;
        });   
    };
    $scope.showRecipeIngredient();

    $ionicModal.fromTemplateUrl('my-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});
	$scope.openModal = function() {
		$scope.modal.show();
	};
	$scope.closeModal = function() {
		$scope.modal.hide();
	};

	$ionicModal.fromTemplateUrl('rating-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.ratingModal = modal;
	});
	$scope.recipeId = null;
	$scope.recipeRating = null;
	$scope.giveRating = function(recipeId, rating) {
		$scope.recipeId = recipeId;
		$scope.recipeRating = rating;
		$scope.ratingModal.show();
	};

	$scope.showToastBottom = function(){
      ionicToast.show('Rating saved.', 'bottom',false, 2000);
    };

	$scope.saveRating = function() {
		$ionicLoading.show();
		if($scope.recipeRating == 0){
			$averageRating = ($scope.recipeRating*1 + $scope.rating.rate*1);
		}else {
			$averageRating = ($scope.recipeRating*1 + $scope.rating.rate*1) / 2;
		}
		recipeServices.saveRating({
            recipeId: $scope.recipeId,
            rating: $averageRating
        }).success(function(data){
            
        });
		$scope.ratingModal.hide();
		$scope.showRecipeId();
		$ionicLoading.hide();
		$scope.showToastBottom();
	};
	// //Cleanup the modal when we're done with it!
	// $scope.$on('$destroy', function() {
	// 	$scope.modal.remove();
	// });
	// // Execute action on hide modal
	// $scope.$on('modal.hidden', function() {
	// 	// Execute action
	// });
	// // Execute action on remove modal
	// $scope.$on('modal.removed', function() {
	// 	// Execute action
	// });

	$scope.addToFav = function(myFav){
		favRecipe.push(myFav);
		favRecipeCache.put('fav', favRecipe);
		$scope.showRecipeId();
	};

	$scope.getFavRecipe = function getFavRecipe(){
    	if(favRecipe.length==0){
    		$scope.favRecipeCacheExist=false;
    	}else{
    		$scope.favRecipeCacheExist=true;
    		$ionicLoading.show();
	        recipeServices.getFavRecipe({
	            recipeId: favRecipeCache.get('fav')
	        }).success(function(data){
	            $scope.favRecipes = data;
	            $ionicLoading.hide();
	        });
    	}
    };
    $scope.getFavRecipe();

    $scope.removeFromFav = function(myFav){
		$favRecipeList = favRecipeCache.get('fav');
		$x = null;
		for($i=0; $i<$favRecipeList.length; $i++){
			if($favRecipeList[$i]==myFav){
				$x = $i;
			}
		}
		favRecipe.splice($x,1);
		favRecipeCache.put('fav', favRecipe);
		$scope.showRecipeId();
	};

	$scope.doRefresh = function() {
	    $scope.getFavRecipe();
	    $scope.$broadcast('scroll.refreshComplete');
	};

	$scope.toggleCuisine = function toggleCuisine(cuisine) {
	    $idx = $scope.filterCuisine.indexOf(cuisine);

	    // is currently selected
	    if ($idx > -1) {
	      $scope.filterCuisine.splice($idx, 1);
	    }

	    // is newly selected
	    else {
	      $scope.filterCuisine.push(cuisine);
	    }
	    console.log($scope.filterCuisine);
	    $scope.getBestRecipe();
	};

	$scope.toggleOccasion = function toggleOccasion(occasion) {
	    $idx = $scope.filterOccasion.indexOf(occasion);

	    // is currently selected
	    if ($idx > -1) {
	      $scope.filterOccasion.splice($idx, 1);
	    }

	    // is newly selected
	    else {
	      $scope.filterOccasion.push(occasion);
	    }
	    console.log($scope.filterOccasion);
	    $scope.getBestRecipe();
	};
})

.controller('findRecipeController', function($scope, findRecipeServices, InputCuisine, InputOccasion, InputIngredient, InputSearch, $ionicLoading) {
 	// $scope.userCuisine=[];
 	$scope.userCuisine = InputCuisine;
 	$scope.userOccasion = InputOccasion;
 	$scope.ingredient = InputIngredient;
 	$scope.userSearch = InputSearch;

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
	};
    $scope.findRecipe = function findRecipe(userSearch){
    	if(userSearch=="not"){
    		$scope.userSearch=false;
    	}else{
    		$scope.userSearch=true;
    	}
    	$ionicLoading.show();
        findRecipeServices.findRecipe({
            cuisine: $scope.userCuisine,
            occasion: $scope.userOccasion,
            ingredient: $scope.ingredient.name,
            search: userSearch
        }).success(function(data){
            $scope.foundRecipe = data;
            $ionicLoading.hide();
        });
    };
    $scope.findRecipe(InputSearch);
});