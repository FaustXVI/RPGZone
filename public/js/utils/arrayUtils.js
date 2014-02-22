var arrayUtils = angular.module('arrayUtils', []);

arrayUtils.factory('arrayUtils', function () {
    return {
        addToScope: function (scope) {
            scope.addElementToList = this.addElementToList;
            scope.removeElementToList = this.removeElementToList;
        },
        addElementToList: function (list, factoryMethod) {
            var element;
            if (factoryMethod) {
                element = factoryMethod();
            } else {
                element = {};
            }
            list.push(element);
        },
        removeElementToList: function (list, element) {
            var index = list.indexOf(element);
            if (index > -1) {
                list.splice(index, 1);
            }
        },
        initArrays: function (object, arrayNames) {
            for (var i = 0; i < arrayNames.length; i++) {
                var arrayName = arrayNames[i];
                if (!object[arrayName]) {
                    object[arrayName] = [];
                }
            }
        }
    };
});
