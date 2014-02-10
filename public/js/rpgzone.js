var rpgZone = angular.module('rpgZone', ['ngResource']);

rpgZone.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
})

rpgZone.controller('CharacterController', function ($scope, $location, $resource) {

    var characterDAO = $resource('/characters/:characterId', {characterId: '@id'}, { get: {method: 'GET',isArray: true }});

    characterDAO.get().$promise.then(
        function(result) {
            $scope.characters = result;
        }
    );

});