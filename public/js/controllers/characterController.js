var rpgZone = angular.module('characterController', ['characterService', 'initCharacterUtils', 'arrayUtils', 'calculator']);

rpgZone.controller('characterController', function ($scope, $location, characterService, initCharacterUtils, calculator, arrayUtils) {

    var loadCurrentCharacter = function () {
        if ($location.search() && $location.search().id) {
            $scope.character = characterService.get({characterId: $location.search().id}, initCharacterUtils.init);
        } else {
            $scope.character = {};
            initCharacterUtils.init($scope.character);
        }
    };

    var saveCharacter = function () {
        if (!$scope.character._id) {
            $scope.character = new characterService($scope.character);
            $scope.character.$save();
        } else {
            $scope.character.$update();
        }
    };

    calculator.addToScope($scope);
    arrayUtils.addToScope($scope);
    $scope.submit = saveCharacter;

    loadCurrentCharacter();
});
