
var app = angular.module('DBAdmin', ['breeze.angular', 'ui.bootstrap', 'ngCookies',
    'ngRoute', 'chieffancypants.loadingBar', 'ngAnimate', 'ngTable', 'ngResource'])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
}]);
/**
 * Loading Directive
 * @see http://tobiasahlin.com/spinkit/
 */
app.directive('loading', function () {
    return {
        restrict: 'AE',
        replace: 'false',
        template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
    }
});

app.factory('logger', [
    '$log', function($log) {

        // This logger wraps the toastr logger and also logs to console using ng $log
        // toastr.js is library by John Papa that shows messages in pop up toast.
        // https://github.com/CodeSeven/toastr

        toastr.options.timeOut = 2000; // 2 second toast timeout
        toastr.options.positionClass = 'toast-bottom-right';

        var logger = {
            error: error,
            info: info,
            log: log, // straight to console; bypass toast
            success: success,
            warning: warning
        };

        return logger;

        function error(message, title) {
            toastr.error(message, title);
            $log.error("Error: " + message);
        }

        function info(message, title) {
            toastr.info(message, title);
            $log.info("Info: " + message);
        }

        function log(message) {
            $log.log(message);
        }

        function success(message, title) {
            toastr.success(message, title);
            $log.info("Success: " + message);
        }

        function warning(message, title) {
            toastr.warning(message, title);
            $log.warn("Warning: " + message);
        }

    }
]);



/**
 * Master Controller
 */
app.controller('MasterCtrl', function ($scope, $cookieStore) {

    /**
     * Sidebar Toggle & Cookie Control
     *
     */
    var mobileView = 992;

    $scope.getWidth = function () { return window.innerWidth; };

    $scope.$watch($scope.getWidth, function (newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                if ($cookieStore.get('toggle') == false) {
                    $scope.toggle = false;
                }
                else {
                    $scope.toggle = true;
                }
            }
            else {
                $scope.toggle = true;
            }
        }
        else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function () {
        $scope.toggle = !$scope.toggle;

        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function () { $scope.$apply(); };
});


/**
 * Alerts Controller
 */
app.controller('AlertsCtrl', function ($scope) {
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
});