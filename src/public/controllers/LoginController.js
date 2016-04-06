/**
 * Created by danle on 4/3/16.
 */
(function () {
    angular
        .module('authDemo')
        .controller('LoginController', ['LoginService', '$location',LoginController]);

    function LoginController (LoginService, $location) {
        var vm = this;

        vm.signup = signup;
        vm.login = login;

        function login(email, password) {
            var loginObj = {
                email: email,
                password: password
            };
            LoginService.login(loginObj).then(function (data) {
                if (data) {
                    $location.path('/home')
                }
            })
        }

        function signup() {
            var signupObj = {
                email: vm.email,
                password: vm.password
            };
            LoginService.signup(signupObj).then(function (data) {
                if (data) {
                    $location.path('/home')
                }
            });
        }
    }
})();