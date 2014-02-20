var rpgZone = angular.module('rpgZone', ['characterListController', 'characterController']);

rpgZone.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});
