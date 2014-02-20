var rpgZone = angular.module('characterController', ['characterService', 'arrayUtils', 'calculator']);

rpgZone.controller('characterController', function ($scope, $location, characterService, arrayUtils, calculator) {

    var initDDArrays = function (character) {
        arrayUtils.initArrays(character, ["notes", "powers", "feats", "equipments"]);
    };

    var loadCurrentCharacter = function () {
        if ($location.search() && $location.search().id) {
            $scope.character = characterService.get({characterId: $location.search().id}, initDDArrays);
        } else {
            $scope.character = {};
            initDDArrays($scope.character);
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

    $scope.calculateMod = calculator.calculateMod;
    $scope.calculateTotalMod = calculator.calculateTotalMod;
    $scope.calculateBloodied = calculator.calculateBloodied;
    $scope.calculateSurge = calculator.calculateSurge;
    $scope.calculateHalfLevel = calculator.calculateHalfLevel;
    $scope.addElementToList = arrayUtils.addElementToList;
    $scope.removeElementToList = arrayUtils.removeElementToList;
    $scope.submit = saveCharacter;

    loadCurrentCharacter();
});
