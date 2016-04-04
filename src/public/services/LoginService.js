/**
 * Created by danle on 4/3/16.
 */
(function () {
    angular
        .module('authDemo')
        .service('LoginService', LoginService);

    function LoginService($http) {
        this.signup = function (signup) {
            return $http({
                method: 'POST',
                url: '/auth/signup',
                data: signup
            })
        };
        this.login = function (login) {
            return $http({
                method: 'POST',
                url: '/auth/login',
                data: login
            })
        };
    }
})();