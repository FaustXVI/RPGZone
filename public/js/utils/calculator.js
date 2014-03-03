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
        calculateHalfLevel: function () {
            var level = this.character.id.level;
            if (level) {
                return Math.floor(level / 2);
            } else {
                return 0;
            }
        },
        calculateTotalMod: function (value) {
            if (level) {
                return this.calculateMod(value) + this.calculateHalfLevel();
            } else {
                return 0;
            }
        },
        calculateBloodied: function () {
            var max = this.character.hp.max;
            if (max) {
                return Math.floor(max / 2);
            } else {
                return 0;
            }
        },
        calculateSurge: function () {
            var max = this.character.hp.max;
            if (max) {
                return Math.floor(max / 4);
            } else {
                return 0;
            }
        },
        calculateSumMod: function (abilities) {
            if (abilities) {
                var sum = 0;
                for (var i = 0; i < abilities.length; i++) {
                    var abi = abilities[i];
                    sum += this.calculateMod(this.character.ability[abi]);
                }
                return sum;
            } else {
                return 0;
            }
        },
        calculateSkill: function (abi, skill) {
            if (skill && this.character.ability) {
                return this.calculateTotalMod(this.character.ability[abi])
                    + this.valueOrZero(this.character.skills[skill].trained)
                    + this.valueOrZero(this.character.skills[skill].bonus);
            } else {
                return 0;
            }
        }
    };
});
