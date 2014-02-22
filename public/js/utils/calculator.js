var calculator = angular.module('calculator', []);

calculator.factory('calculator', function () {
    return {
        addToScope: function (scope) {
            scope.calculateMod = this.calculateMod;
            scope.calculateTotalMod = this.calculateTotalMod;
            scope.calculateBloodied = this.calculateBloodied;
            scope.calculateSurge = this.calculateSurge;
            scope.calculateHalfLevel = this.calculateHalfLevel;
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
        }
    };
});
