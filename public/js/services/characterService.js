var characterService = angular.module('characterService', ['ngResource']);

characterService.factory('characterService', function ($resource) {
    return $resource('/characters/:characterId', {characterId: '@_id'}, {update: {method: 'PUT'}});
});