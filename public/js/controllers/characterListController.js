var characterListController = angular.module('characterListController', ['characterService', 'ui.bootstrap']);

characterListController.controller('characterListController', function ($scope, characterService, $modal) {

    function loadCharacters() {
        $scope.characters = characterService.query();
    }

    $scope.suppress = function (character) {
        var modalInstance = $modal.open({
            templateUrl: "modals/confirmDeleteFromList.html",
            controller: ModalInstanceCtrl,
            resolve: {
                item: function () {
                    return character.id;
                }
            }
        });
        modalInstance.result.then(function () {
            characterService.delete({characterId: character._id}, function () {
                    loadCharacters();
                }
            );
        });
    };

    var ModalInstanceCtrl = function ($scope, $modalInstance, item) {

        $scope.item = item;

        $scope.ok = function () {
            $modalInstance.close(item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

    loadCharacters();

});