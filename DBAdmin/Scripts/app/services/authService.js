'use strict';
app.factory('authService', ['$http', '$q', function ($http, $q) {

    var authServiceFactory = {};





    var _login = function (loginData) {

        var data = "username=" + loginData.userName + "&password=" + loginData.password + + "&returnUrl=" + loginData.returnUrl;

        var deferred = $q.defer();

        $http.post('/Account/Login', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

 

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

       

    };



    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
 

    return authServiceFactory;
}]);