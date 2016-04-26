// Ionic Starter App
// declare dependences 

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'multipleSelect', 'angular-cache', 'ionic.rating', 'ionic-toast'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.scrolling.jsScrolling(false);
  // $ionicConfigProvider.views.maxCache(5);
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('menu', {
    url: '/',
    templateUrl: 'layouts/menu.html',
    controller: 'MenuController'
  });

  $stateProvider.state('cuisine', {
    url: '/cuisine',
    templateUrl: 'layouts/cuisine.html',
    controller: 'findRecipeController'
  });

  $stateProvider.state('occasion', {
    url: '/occasion',
    templateUrl: 'layouts/occasion.html',
    controller: 'findRecipeController'
  });

  $stateProvider.state('ingredient', {
    url: '/ingredient',
    templateUrl: 'layouts/ingredient.html',
    controller: 'findRecipeController'
  });

  $stateProvider.state('foundRecipe', {
    url: '/foundRecipe',
    templateUrl: 'layouts/foundRecipe.html',
    controller: 'findRecipeController'
  });

  $stateProvider.state('setting', {
    url: '/setting',
    templateUrl: 'setting.html'
  });

  $stateProvider.state('bestRecipe', {
    url: '/bestRecipe',
    templateUrl: 'layouts/bestRecipe.html',
    controller: 'recipeController'
  });

  $stateProvider.state('recipe', {
    url: '/recipe/:recipeId',
    templateUrl: 'layouts/recipe.html',
    controller: 'recipeController'
  });

  $stateProvider.state('favRecipe', {
    url: '/favRecipe',
    templateUrl: 'layouts/favRecipe.html',
    controller: 'recipeController'
  });

  $stateProvider.state('aboutUs', {
    url: '/aboutUs',
    templateUrl: 'layouts/aboutUs.html',
    // controller: 'recipeController'
  });

  $stateProvider.state('contactUs', {
    url: '/contactUs',
    templateUrl: 'layouts/contactUs.html',
    controller: 'feedbackController'
  });


  // BM Page
  $stateProvider.state('bm-menu', {
    url: '/bm',
    templateUrl: 'layouts-bm/menu.html',
    controller: 'MenuController'
  });

  $stateProvider.state('bm-cuisine', {
    url: '/bm-cuisine',
    templateUrl: 'layouts-bm/cuisine.html',
    controller: 'findRecipeControllerBm'
  });

  $stateProvider.state('bm-occasion', {
    url: '/bm-occasion',
    templateUrl: 'layouts-bm/occasion.html',
    controller: 'findRecipeControllerBm'
  });

  $stateProvider.state('bm-ingredient', {
    url: '/bm-ingredient',
    templateUrl: 'layouts-bm/ingredient.html',
    controller: 'findRecipeControllerBm'
  });

  $stateProvider.state('bm-foundRecipe', {
    url: '/bm-foundRecipe',
    templateUrl: 'layouts-bm/foundRecipe.html',
    controller: 'findRecipeControllerBm'
  });

  $stateProvider.state('bm-setting', {
    url: '/bm-setting',
    templateUrl: 'setting.html'
  });

  $stateProvider.state('bm-bestRecipe', {
    url: '/bm-bestRecipe',
    templateUrl: 'layouts-bm/bestRecipe.html',
    controller: 'recipeControllerBm'
  });

  $stateProvider.state('bm-recipe', {
    url: '/bm-recipe/:recipeId',
    templateUrl: 'layouts-bm/recipe.html',
    controller: 'recipeControllerBm'
  });

  $stateProvider.state('bm-favRecipe', {
    url: '/bm-favRecipe',
    templateUrl: 'layouts-bm/favRecipe.html',
    controller: 'recipeControllerBm'
  });

  $stateProvider.state('bm-aboutUs', {
    url: '/bm-aboutUs',
    templateUrl: 'layouts-bm/aboutUs.html',
    // controller: 'recipeController'
  });

  $stateProvider.state('bm-contactUs', {
    url: '/bm-contactUs',
    templateUrl: 'layouts-bm/contactUs.html',
    controller: 'feedbackControllerBm'
  });


  $urlRouterProvider.otherwise('/');
})