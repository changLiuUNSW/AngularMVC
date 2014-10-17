/* dataservice: data access and model management layer 
 * relies on Angular injector to provide:
 *     $timeout - Angular equivalent of 'setTimeout'
 *     breeze - the Breeze.Angular service (which is breeze itself)
 *     logger - the application's logging facility
 */
(function () {

    app.factory('dataservice',
    ['$http', '$q', '$timeout', 'breeze', 'logger', dataservice]);

    function dataservice($http, $q, $timeout, breeze, logger) {

        var serviceName = 'breeze/QPBreeze'; // route to the same origin Web Api controller

        // *** Cross origin service example  ***
        // When data server and application server are in different origins
        //var serviceName = 'http://sampleservice.breezejs.com/api/todos/';

        var manager = new breeze.EntityManager(serviceName);
        manager.enableSaveQueuing(true);

        var service = {
            addPropertyChangeHandler: addPropertyChangeHandler,
            getAlldays: getAlldays,
            hasChanges: hasChanges,
            purge: purge,
            reset: reset,
            removePropertyChangeHandler: removePropertyChangeHandler,
            saveChanges: saveChanges,
            querydays: querydays
        };
        return service;

        /*** implementation details ***/

        function addPropertyChangeHandler(handler) {
            // Actually adds any 'entityChanged' event handler
            // call handler when an entity property of any entity changes
            return manager.entityChanged.subscribe(function (changeArgs) {
                var action = changeArgs.entityAction;
                if (action === breeze.EntityAction.PropertyChange) {
                    handler(changeArgs);
                }
            });
        }

        function querydays(queryParams) {
            var query = breeze.EntityQuery
    .from("Todos");
//            var queryParams = {
//                PageNumber: $scope.tableParams.page(),
//                PageSize: $scope.tableParams.count(),
//                SortColumn: $scope.SortColumn,
//                SortOrder: $scope.SortOrder,
//                SearchTerm: $scope.SearchTerm
            //            };
            for (var i in queryParams['Filter']) {
              
                query = query.where(i, breeze.FilterQueryOp.Contains, queryParams['Filter'][i]);
            }
            if (queryParams['SortColumn']) {
                if (queryParams['SortOrder']) {
                    query= query.orderBy(queryParams['SortColumn']+' '+queryParams['SortOrder']);
                } else {
                    query= query.orderBy(queryParams['SortColumn']);
                }
            }

            query = query.skip((queryParams['PageNumber'] - 1) * queryParams['PageSize'])
            .take(queryParams['PageSize']);
          
            var promise = manager.executeQuery(query).catch(queryFailed);
            return promise;

            function queryFailed(error) {
                logger.error(error.message, "Query failed");
                return $q.reject(error); // so downstream promise users know it failed
            }
        }


        function getAlldays() {
            var query = breeze.EntityQuery
                .from("Todos").where('Description', breeze.FilterQueryOp.Contains, 'y').orderBy('Description desc');

          

            var promise = manager.executeQuery(query).catch(queryFailed);
            return promise;

            function queryFailed(error) {
                logger.error(error.message, "Query failed");
                return $q.reject(error); // so downstream promise users know it failed
            }
        }

        function hasChanges() {
            return manager.hasChanges();
        }

        function handleSaveValidationError(error) {
            var message = "Not saved due to validation error";
            try { // fish out the first error
                var firstErr = error.entityErrors[0];
                message += ": " + firstErr.errorMessage;
            } catch (e) { /* eat it for now */ }
            return message;
        }

        function removePropertyChangeHandler(handler) {
            // Actually removes any 'entityChanged' event handler
            return manager.entityChanged.unsubscribe(handler);
        }

        function saveChanges() {
            return manager.saveChanges()
                .then(saveSucceeded)
                .catch(saveFailed);

            function saveSucceeded(saveResult) {
                logger.success("# of Todos saved = " + saveResult.entities.length);
                logger.log(saveResult);
            }

            function saveFailed(error) {
                var reason = error.message;
                var detail = error.detail;

                if (error.entityErrors) {
                    reason = handleSaveValidationError(error);
                } else if (detail && detail.ExceptionType &&
                    detail.ExceptionType.indexOf('OptimisticConcurrencyException') !== -1) {
                    // Concurrency error 
                    reason =
                        "Another user, perhaps the server, " +
                        "may have deleted one or all of the todos." +
                        " You may have to restart the app.";
                } else {
                    reason = "Failed to save changes: " + reason +
                        " You may have to restart the app.";
                }

                logger.error(error, reason);
                // DEMO ONLY: discard all pending changes
                // Let them see the error for a second before rejecting changes
                $timeout(function () {
                    manager.rejectChanges();
                }, 1000);
                return $q.reject(error); // so downstream promise users know it failed
            }

        }

        //#region demo operations
        function purge(callback) {
            return $http.post(serviceName + '/purge')
            .then(function () {
                logger.success("database purged.");
                manager.clear();
                if (callback) callback();
            })
            .catch(function (error) {
                logger.error("database purge failed: " + error);
                return $q.reject(error); // so downstream promise users know it failed
            });
        }

        function reset(callback) {
            return $http.post(serviceName + '/reset')
            .then(function () {
                logger.success("database reset.");
                manager.clear();
                if (callback) callback();
            })
            .catch(function (error) {
                logger.error("database reset failed: " + error);
                return $q.reject(error); // so downstream promise users know it failed
            });
        }
        //#endregion
    }
})();