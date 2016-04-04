/**
 * Created by danle on 4/3/16.
 */
(function () {
    angular
        .module('authDemo')
        .controller('LoginController', ['LoginService', LoginController]);

    function LoginController (LoginService) {
        var vm = this;

        vm.signup = signup;
        vm.login = login;

        function login(email, password) {
            var loginObj = {
                email: email,
                password: password
            };
            LoginService.login(loginObj);
        }

        function signup() {
            var signupObj = {
                email: vm.email,
                password: vm.password
            };
            LoginService.signup(signupObj);
        }
    }
})();