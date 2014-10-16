'use strict';
app.config(function($routeProvider, $locationProvider, cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    $routeProvider
        .when('/',
        {
            controller: 'AboutController',
            templateUrl: '/Servers/DataTable'
        })
       .otherwise({
           controller: function ($window) {
                $window.location.href='/';
            }
        });
    // Specify HTML5 mode (using the History APIs) or HashBang syntax.
    $locationProvider.html5Mode(false).hashPrefix('!');
});


app.controller('AboutController', [
    '$scope', '$filter', 'ngTableParams', '$location', function ($scope, $filter, ngTableParams, $location) {
        $scope.alerts = [];
        $scope.showDetail= function(name) {
            console.log(name);
        }
        $scope.toggleFilter = function (params) {
            params.settings().$scope.show_filter = !params.settings().$scope.show_filter;
        };

        $scope.init = function() {
            var data = [
                { name: "Moroni", age: 50 },
                { name: "Tiancum", age: 43 },
                { name: "Jacob", age: 27 },
                { name: "Nephi", age: 29 },
                { name: "Enos", age: 34 },
                { name: "Tiancum", age: 43 },
                { name: "Jacob", age: 27 },
                { name: "Nephi", age: 29 },
                { name: "Enos", age: 34 },
                { name: "Tiancum", age: 43 },
                { name: "Jacob", age: 27 },
                { name: "Nephi", age: 29 },
                { name: "Enos", age: 34 },
                { name: "Tiancum", age: 43 },
                { name: "Jacob", age: 27 },
                { name: "Nephi", age: 29 },
                { name: "Enos", age: 34 }
            ];

            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10, // count per page
                sorting: {
                    name: 'asc' // initial sorting
                }
            }, {
                total: data.length, // length of data
                getData: function($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.filter() ?
                        $filter('filter')(data, params.filter()) :
                        data;
                    orderedData = params.sorting() ?
                        $filter('orderBy')(orderedData, params.orderBy()) :
                        orderedData;
                    $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve($scope.users);
                }
            });
        };
        $scope.init();

    }
]);