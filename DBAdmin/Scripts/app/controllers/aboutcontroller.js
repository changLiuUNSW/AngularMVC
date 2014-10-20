'use strict';


app.controller('AboutController', [
    '$scope', '$filter', 'ngTableParams', 'publicholidayService', 'dataservice', 'logger', '$q',
    function($scope, $filter, ngTableParams, publicholidayService, dataservice, logger, $q) {
        $scope.alerts = [];
        $scope.showDetail = function(name) {
            console.log(name);
        };
        $scope.toggleFilter = function(params) {
            params.settings().$scope.show_filter = !params.settings().$scope.show_filter;
            $scope.showFilter = params.settings().$scope.show_filter;
            $scope.tableParams.reload();
        };
        $scope.convertDate = function(inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s; }

            var d = new Date(inputFormat);
            return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
        };
      

        // set defaults
        $scope.showFilter = false;
        $scope.tableDate = [];
        $scope.page = 1;
        $scope.pageSize = 20;
        $scope.SortColumn = "Description";
        $scope.SortOrder = "asc";
        $scope.SearchTerm = "";

//            $scope.tableParams = new ngTableParams({
//                page: $scope.page,
//                count: $scope.total
////                sorting: {
////                    name: 'asc' // initial sorting
////                }
//            }, {
//                total: $scope.total, // length of data
////                getData: function($defer, params) {
////                    // use build-in angular filter
////                    var orderedData = params.filter() ?
////                        $filter('filter')(data, params.filter()) :
////                        data;
////                    orderedData = params.sorting() ?
////                        $filter('orderBy')(orderedData, params.orderBy()) :
////                        orderedData;
////                    $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
////
////                    params.total(orderedData.length); // set total for recalc pagination
////                    $defer.resolve($scope.users);
//                //                }
//                getData: function ($defer, params) {
//                    for (var i in params.sorting()) {
//                        $scope.SortColumn = i;
//                        $scope.SortOrder = params.sorting()[i];
//                    }
//                    var papramToPost= {
//                        PageNumber: $scope.tableParams.page(),
//                        PageSize: $scope.tableParams.count(),
//                        SortColumn: $scope.SortColumn,
//                        SortOrder: $scope.SortOrder,
//                        SearchTerm: $scope.SearchTerm
//                    }
//                    
//                        dataservice.querydays()
//                            .then(function (data) {
//                            $scope.tableDate = data.results;
//                            console.log($scope.tableDate);
////                            $defer.resolve(data.results);
////                            params.total(data.results.length);
////                                logger.info("Fetched Todos ");
//                        });
//                   
//
//                   
//
////                    publicholidayService.getAllholidays().$promise.then(function (result) {
////                        $defer.resolve(result);
////                        params.total(result.length);
////                    });
//                }
        //            });

        $scope.tableParams = new ngTableParams(
            {
                page: $scope.page,
                count: $scope.pageSize
            },
            {
                total: 0, // length of data
                getData: function($defer, params) {
                    for (var i in params.sorting()) {
                        $scope.SortColumn = i;
                        $scope.SortOrder = params.sorting()[i];
                    }
                    
                    var queryParams = {
                        PageNumber: $scope.tableParams.page(),
                        PageSize: $scope.tableParams.count(),
                        SortColumn: $scope.SortColumn,
                        SortOrder: $scope.SortOrder,
                        Filter: $scope.tableParams.filter()
                    };
                    if (!$scope.showFilter) {
                        queryParams= {
                            PageNumber: $scope.tableParams.page(),
                            PageSize: $scope.tableParams.count(),
                            SortColumn: $scope.SortColumn,
                            SortOrder: $scope.SortOrder,
                            Filter: null
                        }
                    }
                    $q.all([
                        dataservice.querydays(queryParams),
                        dataservice.queryCount(queryParams)
                    ]).then(function(response) {
                        $scope.tableDate = response[0].results;
                        params.total(response[1].inlineCount);
                        $defer.resolve();
                    });
                }
            }
        );
    }
]);