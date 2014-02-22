var initCharacterUtils = angular.module('initCharacterUtils', ['arrayUtils', 'objectUtils']);

initCharacterUtils.factory('initCharacterUtils', ['arrayUtils', 'objectUtils', function (arrayUtils, objectUtils) {
    return {
        init: function (character) {
            arrayUtils.initArrays(character, ["notes", "feats", "equipments"]);
            objectUtils.initObjects(character, ["ability", "defenses", "skills", "id", "movement", "hp", "powers"]);
            objectUtils.initObjects(character.skills, [
                "acrobatics",
                "arcana",
                "athletics",
                "bluff",
                "diplomacy",
                "dungeoneering",
                "endurance",
                "heal",
                "history",
                "insight",
                "intimidate",
                "nature",
                "perception",
                "religion",
                "stealth",
                "streetwise",
                "streetwise",
                "thievery",
                "alchemy"
            ]);
            arrayUtils.initArrays(character.powers, ["atWill", "encounter", "daily", "utility"]);
        },
        createEquipment: function () {
            return {"powers": []};
        }
    };
}
]);