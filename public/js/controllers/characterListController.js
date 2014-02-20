var characterListController = angular.module('characterListController', ['characterService']);

characterListController.controller('characterListController', function ($scope, characterService) {

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