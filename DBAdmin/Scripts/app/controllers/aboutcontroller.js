
app.controller('AboutController', [
    '$scope', '$filter', 'ngTableParams', function($scope, $filter, ngTableParams) {
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