var rpgZone = angular.module('rpgZone', ['ngResource']);

rpgZone.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
})

rpgZone.controller('CharacterController', function ($scope, $location, $resource) {

    var characterDAO = $resource('/characters/:characterId', {characterId: '@id'}, { update: {method: 'PUT' } });

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

    var $currentId;
    $scope.character = {};

    var saveCurrentId = function (result) {
        $currentId = result._id;
        $location.search({'id': $currentId});
        delete result._id;
    };

    if ($location.search() && $location.search().id) {
        characterDAO.get({characterId: $location.search().id}).$promise
            .then(
            function (result) {
                saveCurrentId(result);
                $scope.character = result;
            }
        )
    }

    $scope.submit = function () {
        if ($currentId) {
            characterDAO.update({ characterId: $currentId }, $scope.character);
        } else {
            characterDAO.save($scope.character).$promise.then(saveCurrentId);
        }
    }

    $scope.delete = function () {
        characterDAO.delete({ characterId: $currentId }).$promise.then(
            function () {
                window.location = "/";
            }
        );
    }

});