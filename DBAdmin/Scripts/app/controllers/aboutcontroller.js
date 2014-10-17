'use strict';
app.controller('AboutController', [
    '$scope', '$filter', 'ngTableParams', 'publicholidayService', function ($scope, $filter, ngTableParams, publicholidayService) {
        $scope.alerts = [];
        $scope.showDetail= function(name) {
            console.log(name);
        }
        $scope.toggleFilter = function (params) {
            params.settings().$scope.show_filter = !params.settings().$scope.show_filter;
        };

        $scope.init = function () {
            // set defaults
            $scope.total = 5;
            $scope.page = 1;
            $scope.pageSize = 10;
            $scope.SortColumn = "description";
            $scope.SortOrder = "asc";
            $scope.SearchTerm = "";

            $scope.tableParams = new ngTableParams({
                page: $scope.page,
                count: $scope.total
//                sorting: {
//                    name: 'asc' // initial sorting
//                }
            }, {
                total: $scope.total, // length of data
//                getData: function($defer, params) {
//                    // use build-in angular filter
//                    var orderedData = params.filter() ?
//                        $filter('filter')(data, params.filter()) :
//                        data;
//                    orderedData = params.sorting() ?
//                        $filter('orderBy')(orderedData, params.orderBy()) :
//                        orderedData;
//                    $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
//
//                    params.total(orderedData.length); // set total for recalc pagination
//                    $defer.resolve($scope.users);
                //                }
                getData: function ($defer, params) {
                    for (var i in params.sorting()) {
                        $scope.SortColumn = i;
                        $scope.SortOrder = params.sorting()[i];
                    }
                    var papramToPost= {
                        PageNumber: $scope.tableParams.page(),
                        PageSize: $scope.tableParams.count(),
                        SortColumn: $scope.SortColumn,
                        SortOrder: $scope.SortOrder,
                        SearchTerm: $scope.SearchTerm
                    }


                    publicholidayService.getAllholidays().$promise.then(function (result) {
                        $defer.resolve(result);
                        params.total(result.length);
                    });
                }
            });
        };
        $scope.init();

    }
]);