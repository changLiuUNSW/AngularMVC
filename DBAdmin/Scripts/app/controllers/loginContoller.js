'use strict';
app.controller('loginController', [
    '$scope', 'authService', '$window', function ($scope, authService, $window) {
        $scope.loginData = {
            userName: "",
            password: ""
        };

        $scope.login = function () {
            console.log($scope.loginData);
            authService.login($scope.loginData).then(function (response) {
                console.log(response);
                $scope.loginData.userName = response.username;
                $scope.loginData.password = response.password;
//                    $window.location.href='/';

                },
             function (err) {
                 console.log(err);
                 $scope.message = err.error_description;
             });
        };
    }
]);