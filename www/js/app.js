// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'multipleSelect'])

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
  $ionicConfigProvider.views.maxCache(5);
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('menu', {
    url: '/',
    templateUrl: 'layouts/menu.html',
    controller: 'MainCtrl'
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

  $urlRouterProvider.otherwise('/');
})