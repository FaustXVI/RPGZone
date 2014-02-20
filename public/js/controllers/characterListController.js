var rpgZone = angular.module('characterListController', ['characterService']);

rpgZone.controller('CharacterListController', function ($scope, $location, characterService) {

    function loadCharacters() {
        $scope.characters = characterService.query();
    }

    $scope.suppress = function (id) {
        console.log("Suppress " + id);
        characterService.delete({characterId: id}, function () {
                loadCharacters();
            }
        );

    };

    loadCharacters();

});