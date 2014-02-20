var arrayUtils = angular.module('arrayUtils', []);

arrayUtils.factory('arrayUtils', function () {
    return {
        addElementToList: function (list) {
            list.push({});
        },
        removeElementToList: function (list, element) {
            var index = list.indexOf(element);
            if (index > -1) {
                list.splice(index, 1);
            }
        },
        initArrays: function (character, arrayNames) {
            for (var i = 0; i < arrayNames.length; i++) {
                var arrayName = arrayNames[i];
                if (!character[arrayName]) {
                    character[arrayName] = [];
                }
            }
        }
    };
});
