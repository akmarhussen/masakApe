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

.controller('MenuController', function($scope, $state, $ionicModal, $ionicPlatform, $location, $ionicHistory, CacheFactory, ionicToast, $timeout) {
  	$scope.menu = [];

  	$scope.showToastSignUp = function(){
      ionicToast.show('Please Signup.', 'bottom',false, 2000);
    };



    $ionicModal.fromTemplateUrl('username-modal.html', {
		scope: $scope,
		animation: 'slide-in-up',
		backdropClickToClose: false,
		hardwareBackButtonClose: false
	}).then(function(modal) {
		$scope.usernameModal = modal;
	});
	$scope.openModal = function() {
		$scope.usernameModal.show();
	};
	$scope.closeModal = function() {
		$scope.usernameModal.hide();
	};

  	$ionicPlatform.registerBackButtonAction(function() {
		if ($location.path() === "/") {
		  navigator.app.exitApp();
		}
		else {
		  $ionicHistory.goBack();
		}
	}, 100);



	if (!CacheFactory.get('userNameCache')) {
	 	CacheFactory.createCache('userNameCache', {
	 		storageMode: 'localStorage'
	 	});
	};
	var userNameCache = CacheFactory.get('userNameCache');

	$scope.showToastWelcome = function(){
      ionicToast.show('Welcome back '+userNameCache.get('name')+'!', 'bottom',false, 2000);
    };

	$scope.saveUsername = function() {
		userNameCache.put('name', $scope.menu.username);
		$scope.closeModal();
		ionicToast.show('Your name are saved.', 'bottom',false, 2000);
	};

	if(userNameCache.get('name')){
		$scope.showToastWelcome();
	}else {
		$timeout($scope.openModal, 0);
	}
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

	if (!CacheFactory.get('userNameCache')) {
	 	CacheFactory.createCache('userNameCache', {
	 		storageMode: 'localStorage'
	 	});
	}
	var favRecipeCache = CacheFactory.get('favRecipeCache');
	var favRecipe = FavouriteRecipe;

	var userNameCache = CacheFactory.get('userNameCache');
 	
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

    $scope.showRecipeReview = function() {
    	recipeServices.getReview($stateParams.recipeId).success(function(recipe) {
	        $scope.recipeReviews = recipe;
	    }); 
    };
    $scope.showRecipeReview();

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

	$scope.closeRatingModal = function() {
		$scope.ratingModal.hide();
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
		ionicToast.show('Recipe added to favourite.', 'bottom',false, 2000);
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
    	console.log($scope.favRecipeExists);
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
		ionicToast.show('Recipe removed from favourite.', 'bottom',false, 2000);
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

	$scope.review = [];

	$ionicModal.fromTemplateUrl('review-modal.html', {
		scope: $scope,
		animation: 'slide-in-up',
		backdropClickToClose: false,
		hardwareBackButtonClose: false
	}).then(function(modal) {
		$scope.reviewModal = modal;
	});
	$scope.openReviewModal = function() {
		$scope.reviewModal.show();
	};
	$scope.closeReviewModal = function() {
		$scope.reviewModal.hide();
	};

	$scope.saveReview = function(recipeId) {
		if($scope.review.comment==null || $scope.review.comment==""){
			ionicToast.show('Please fill your review.', 'bottom',false, 2000);
		}else{
			$ionicLoading.show();
			recipeServices.saveReview({
	            recipeId: recipeId,
	            comment: $scope.review.comment,
	            username: userNameCache.get('name')
	        }).success(function(data){
	            $ionicLoading.hide();
	        });
			$scope.closeReviewModal();
			$scope.showRecipeReview();
			ionicToast.show('Review submitted.', 'bottom',false, 2000);
		}
	};
})

.controller('findRecipeController', function($scope, $state, findRecipeServices, InputCuisine, InputOccasion, InputIngredient, InputSearch, $ionicLoading, ionicToast) {
 	// $scope.userCuisine=[];
 	$scope.userCuisine = InputCuisine;
 	$scope.userOccasion = InputOccasion;
 	$scope.ingredient = InputIngredient;
 	$scope.userSearch = InputSearch;

 	$scope.showToastBottom = function(){
      ionicToast.show('Please select at least one cuisine.', 'bottom',false, 2000);
    };

    $scope.showToastEmptyOccasion = function(){
      ionicToast.show('Please select occasion.', 'bottom',false, 2000);
    };

    $scope.showToastEmptyIngredient = function(){
      ionicToast.show('Please choose at least one ingredient.', 'bottom',false, 2000);
    };

 	$scope.goToOccasion = function goToOccasion() {
 		if($scope.userCuisine.length==0){
 			$scope.showToastBottom();
 		}else {
 			$state.go('occasion');
 		}
 	};

 	$scope.goToIngredient = function goToIngredient() {
 		if($scope.userOccasion.length==0){
 			$scope.showToastEmptyOccasion();
 		}else {
 			$state.go('ingredient');
 		}
 	};

 	$scope.goTofoundRecipe = function goTofoundRecipe() {
 		if($scope.ingredient.name.length==0){
 			$scope.showToastEmptyIngredient();
 		}else {
 			$state.go('foundRecipe');
 		}
 	};

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
})

.controller('findRecipeControllerBm', function($scope, $state, findRecipeServices, InputCuisine, InputOccasion, InputIngredient, InputSearch, $ionicLoading, ionicToast) {
 	// $scope.userCuisine=[];
 	$scope.userCuisine = InputCuisine;
 	$scope.userOccasion = InputOccasion;
 	$scope.ingredient = InputIngredient;
 	$scope.userSearch = InputSearch;

 	$scope.showToastBottom = function(){
      ionicToast.show('Please select at least one cuisine.', 'bottom',false, 2000);
    };

    $scope.showToastEmptyOccasion = function(){
      ionicToast.show('Please select occasion.', 'bottom',false, 2000);
    };

    $scope.showToastEmptyIngredient = function(){
      ionicToast.show('Please choose at least one ingredient.', 'bottom',false, 2000);
    };

 	$scope.goToOccasion = function goToOccasion() {
 		if($scope.userCuisine.length==0){
 			$scope.showToastBottom();
 		}else {
 			$state.go('bm-occasion');
 		}
 	};

 	$scope.goToIngredient = function goToIngredient() {
 		if($scope.userOccasion.length==0){
 			$scope.showToastEmptyOccasion();
 		}else {
 			$state.go('bm-ingredient');
 		}
 	};

 	$scope.goTofoundRecipe = function goTofoundRecipe() {
 		if($scope.ingredient.name.length==0){
 			$scope.showToastEmptyIngredient();
 		}else {
 			$state.go('bm-foundRecipe');
 		}
 	};

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
})

.controller('feedbackController', function($scope, feedbackServices, $ionicLoading, ionicToast) {
	$scope.feedback= [];

	$scope.showToastFeedback = function(){
      ionicToast.show('Your feedback has been send.', 'bottom',false, 2000);
    };

    $scope.showToastFeedbackName = function(){
      ionicToast.show('Please enter your name.', 'bottom',false, 2000);
    };

    $scope.showToastFeedbackEmail = function(){
      ionicToast.show('Please enter your email.', 'bottom',false, 2000);
    };

    $scope.showToastFeedbackMessage = function(){
      ionicToast.show('Please enter your message.', 'bottom',false, 2000);
    };

	$scope.sendFeedback = function sendFeedback(){
		if($scope.feedback.name=="" || $scope.feedback.name==null){
			$scope.showToastFeedbackName();
		}else if($scope.feedback.email=="" || $scope.feedback.email==null){
			$scope.showToastFeedbackEmail();
		}else if($scope.feedback.message=="" || $scope.feedback.message==null){
			$scope.showToastFeedbackMessage();
		}else{
			$ionicLoading.show();
	       	console.log($scope.feedback.name);
	        feedbackServices.sendFeedback({
	        	name: $scope.feedback.name,
	        	visitorEmail: $scope.feedback.email,
	        	message: $scope.feedback.message
	        }).success(function(data){
	            $ionicLoading.hide();
	            $scope.showToastFeedback();
	        });
		}
    };
})

.controller('feedbackControllerBm', function($scope, feedbackServices, $ionicLoading, ionicToast) {
	$scope.feedback= [];

	$scope.showToastFeedback = function(){
      ionicToast.show('Your feedback has been send.', 'bottom',false, 2000);
    };

    $scope.showToastFeedbackName = function(){
      ionicToast.show('Please enter your name.', 'bottom',false, 2000);
    };

    $scope.showToastFeedbackEmail = function(){
      ionicToast.show('Please enter your email.', 'bottom',false, 2000);
    };

    $scope.showToastFeedbackMessage = function(){
      ionicToast.show('Please enter your message.', 'bottom',false, 2000);
    };

	$scope.sendFeedback = function sendFeedback(){
		if($scope.feedback.name=="" || $scope.feedback.name==null){
			$scope.showToastFeedbackName();
		}else if($scope.feedback.email=="" || $scope.feedback.email==null){
			$scope.showToastFeedbackEmail();
		}else if($scope.feedback.message=="" || $scope.feedback.message==null){
			$scope.showToastFeedbackMessage();
		}else{
			$ionicLoading.show();
	       	console.log($scope.feedback.name);
	        feedbackServices.sendFeedback({
	        	name: $scope.feedback.name,
	        	visitorEmail: $scope.feedback.email,
	        	message: $scope.feedback.message
	        }).success(function(data){
	            $ionicLoading.hide();
	            $scope.showToastFeedback();
	        });
		}
    };
});