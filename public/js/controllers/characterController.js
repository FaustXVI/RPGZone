var rpgZone = angular.module('characterController', ['characterService']);

rpgZone.controller('CharacterController', function ($scope, $location, $window, characterService) {
    var calculateMod = function (value) {
        if (value) {
            return Math.floor((value - 10) / 2);
        } else {
            return 0;
        }
    };

    function calculateHalfLevel(level) {
        if (level) {
            return Math.floor(level / 2);
        } else {
            return 0;
        }
    }

    var calculateTotalMod = function (value, level) {
        if (level) {
            return calculateMod(value) + calculateHalfLevel(level);
        } else {
            return 0;
        }
    };
    var calculateBloodied = function (maxHp) {
        if (maxHp) {
            return Math.floor(maxHp / 2);
        } else {
            return 0;
        }
    };
    var calculateSurge = function (maxHp) {
        if (maxHp) {
            return Math.floor(maxHp / 4);
        } else {
            return 0;
        }
    };
    var addElementToList = function (list) {
        list.push({});
    };
    var removeElementToList = function (list, element) {
        var index = list.indexOf(element);
        if (index > -1) {
            list.splice(index, 1);
        }
    };

    var loadCurrentCharacter = function () {
        $scope.character = {
            notes: [],
            powers: [],
            feats: [],
            equipments: []
        };
        if ($location.search() && $location.search().id) {
            $scope.character = characterService.get({characterId: $location.search().id});
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

    $scope.calculateMod = calculateMod;
    $scope.calculateTotalMod = calculateTotalMod;
    $scope.calculateBloodied = calculateBloodied;
    $scope.calculateSurge = calculateSurge;
    $scope.calculateHalfLevel = calculateHalfLevel;
    $scope.addElementToList = addElementToList;
    $scope.removeElementToList = removeElementToList;
    $scope.submit = saveCharacter;

    loadCurrentCharacter();
});
