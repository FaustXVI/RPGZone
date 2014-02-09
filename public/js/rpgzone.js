var rpgZone = angular.module('rpgZone',[]);


rpgZone.controller('CharacterController', function ($scope) {

    var calculateMod = function (value) {
        if (value) {
            return Math.floor((value - 10) / 2);
        } else {
            return 0;
        }
    }

    var calculateTotalMod = function (value, level) {
        if (level) {
            return calculateMod(value) + Math.floor(level / 2);
        } else {
            return 0;
        }
    }

    $scope.calculateMod = calculateMod;
    $scope.calculateTotalMod = calculateTotalMod;

    $scope.submit = function () {
        console.log("Save char");
    }

});