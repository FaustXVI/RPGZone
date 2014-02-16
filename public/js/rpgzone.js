var rpgZone = angular.module('rpgZone', ['ngResource']);

rpgZone.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});

rpgZone.factory('CharacterService', function ($resource) {
    return $resource('/characters/:characterId', {characterId: '@_id'}, {update: {method: 'PUT'}});
});

rpgZone.controller('CharacterController', function ($scope, $location, $window, CharacterService) {

    var calculateMod = function (value) {
        if (value) {
            return Math.floor((value - 10) / 2);
        } else {
            return 0;
        }
    };

    var calculateTotalMod = function (value, level) {
        if (level) {
            return calculateMod(value) + Math.floor(level / 2);
        } else {
            return 0;
        }
    };

    $scope.calculateMod = calculateMod;
    $scope.calculateTotalMod = calculateTotalMod;

    $scope.character = {};

    if ($location.search() && $location.search().id) {
        $scope.character = CharacterService.get({characterId: $location.search().id});
    }

    $scope.submit = function () {
        if (!$scope.character._id) {
            $scope.character = new CharacterService($scope.character);
            $scope.character.$save();
        } else {
            $scope.character.$update();
        }
    };

});

rpgZone.controller('CharacterListController', function ($scope, $location, CharacterService) {

    $scope.characters = CharacterService.query();


    $scope.suppress = function (id) {
        console.log("Suppress " + id);
        CharacterService.get({characterId: id}, function (result) {
                result.$delete(function () {
                    $scope.characters = CharacterService.query();
                });
            }
        );

    };

});