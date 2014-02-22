var initCharacterUtils = angular.module('initCharacterUtils', ['arrayUtils', 'objectUtils']);

initCharacterUtils.factory('initCharacterUtils', ['arrayUtils', 'objectUtils', function (arrayUtils, objectUtils) {
    return {
        init: function (character) {
            arrayUtils.initArrays(character, ["notes", "feats", "equipments"]);
            objectUtils.initObjects(character, ["powers"]);
            arrayUtils.initArrays(character.powers, ["atWill", "encounter", "daily"]);
        }
    };
}
]);