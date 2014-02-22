var calculator = angular.module('calculator', []);

calculator.factory('calculator', function () {
    return {
        addToScope: function (scope) {
            scope.calculateMod = this.calculateMod;
            scope.calculateTotalMod = this.calculateTotalMod;
            scope.calculateBloodied = this.calculateBloodied;
            scope.calculateSurge = this.calculateSurge;
            scope.calculateHalfLevel = this.calculateHalfLevel;
            scope.calculateSumMod = this.calculateSumMod;
            scope.calculateSkill = this.calculateSkill;
            scope.valueOrZero = this.valueOrZero;
        },
        valueOrZero: function (value) {
            if (value) {
                return value;
            } else {
                return 0;
            }
        },
        calculateMod: function (value) {
            if (value) {
                return Math.floor((value - 10) / 2);
            } else {
                return 0;
            }
        },
        calculateHalfLevel: function (level) {
            if (level) {
                return Math.floor(level / 2);
            } else {
                return 0;
            }
        },
        calculateTotalMod: function (value, level) {
            if (level) {
                return this.calculateMod(value) + this.calculateHalfLevel(level);
            } else {
                return 0;
            }
        },
        calculateBloodied: function (maxHp) {
            if (maxHp) {
                return Math.floor(maxHp / 2);
            } else {
                return 0;
            }
        },
        calculateSurge: function (maxHp) {
            if (maxHp) {
                return Math.floor(maxHp / 4);
            } else {
                return 0;
            }
        },
        calculateSumMod: function (character, abilities) {
            if (abilities) {
                var sum = 0;
                for (var i = 0; i < abilities.length; i++) {
                    var abi = abilities[i];
                    sum += this.calculateMod(character.ability[abi]);
                }
                return sum;
            } else {
                return 0;
            }
        },
        calculateSkill: function (character, abi, skill, level) {
            if (skill && character.ability) {
                return this.calculateTotalMod(character.ability[abi], level)
                    + this.valueOrZero(character.skills[skill].trained)
                    + this.valueOrZero(character.skills[skill].bonus);
            } else {
                return 0;
            }
        }
    };
});
