var rpgZone = angular.module('characterController', ['characterService', 'initCharacterUtils', 'arrayUtils', 'calculator', 'ui.bootstrap']);

rpgZone.controller('characterController', function ($scope, $location, characterService, initCharacterUtils, calculator, arrayUtils, $modal) {

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
        $scope.form.$setPristine();
    };

    calculator.addToScope($scope);
    arrayUtils.addToScope($scope);
    $scope.createEquipment = initCharacterUtils.createEquipment;
    $scope.submit = saveCharacter;

    $scope.open = function (list, elt) {
        var modalInstance = $modal.open({
            templateUrl: "modals/confirmDeleteFromList.html",
            controller: ModalInstanceCtrl,
            resolve: {
                item: function () {
                    return elt;
                }
            }
        });

        modalInstance.result.then(function () {
            arrayUtils.removeElementToList(list, elt);
        })

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

    loadCurrentCharacter();
})
;
