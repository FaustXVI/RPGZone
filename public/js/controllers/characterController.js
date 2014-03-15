var rpgZone = angular.module('characterController', ['characterService', 'initCharacterUtils', 'arrayUtils', 'calculator', 'ui.bootstrap']);

rpgZone.directive('focusMe', function ($timeout) {
    return {
        link: function (scope, element) {
            $timeout(function () {
                element.focus();
            }, 100);
        }
    };
});

rpgZone.directive('redIfBloodied', function () {
    return {
        link: function (scope, element) {
            scope.$watch("character.hp.current", function () {
                    if (scope.character.hp) {
                        if (scope.calculateBloodied() > scope.character.hp.current) {
                            element.addClass("bloodied");
                        } else {
                            element.removeClass("bloodied");
                        }
                    }
                }
            )
        }
    };
});

rpgZone.controller('characterController', function ($scope, $location, characterService, initCharacterUtils, calculator, arrayUtils, $modal, $parse) {

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
            $scope.character.$save().then(function (res) {
                $location.search({id: res._id});
            });
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

    $scope.addTo = function (elt) {
        var modalInstance = $modal.open({
            templateUrl: "modals/enterValue.html",
            controller: ValueModalInstanceCtrl
        });

        modalInstance.result.then(function (valueToAdd) {
            var modelGetter = $parse(elt);
            var modelSetter = modelGetter.assign;
            var previousValue = modelGetter($scope) || 0;
            var added = valueToAdd || 0;
            modelSetter($scope, previousValue + added);
            $scope.form.$setDirty();
        });

    };


    $scope.substractTo = function (elt) {
        var modalInstance = $modal.open({
            templateUrl: "modals/enterValue.html",
            controller: ValueModalInstanceCtrl
        });

        modalInstance.result.then(function (valueToSubtract) {
            var modelGetter = $parse(elt);
            var modelSetter = modelGetter.assign;
            var previousValue = modelGetter($scope) || 0;
            var substracted = valueToSubtract || 0;
            modelSetter($scope, previousValue - substracted);
            $scope.form.$setDirty();
        })

    };

    var ValueModalInstanceCtrl = function ($scope, $modalInstance) {

        $scope.input = {};

        $scope.ok = function () {
            $modalInstance.close($scope.input.value);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
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
