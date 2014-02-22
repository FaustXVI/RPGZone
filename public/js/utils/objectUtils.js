var objectUtils = angular.module('objectUtils', []);

objectUtils.factory('objectUtils', function () {
    return {
        initObjects: function (object, subObjectsNames) {
            for (var i = 0; i < subObjectsNames.length; i++) {
                var subObjectName = subObjectsNames[i];
                if (!object[subObjectName]) {
                    object[subObjectName] = {};
                }
            }
        }
    };
});
