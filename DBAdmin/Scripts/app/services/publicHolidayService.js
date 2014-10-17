'use strict';
app.factory('publicholidayService', [
    '$resource', function($resource) {

        var publicholidayService = {};
        var _getAllholidays = function() {
            return $resource('/api/NewQpInfo').query();
        };
        publicholidayService.getAllholidays = _getAllholidays;
        return publicholidayService;
    }
]);