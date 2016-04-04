/**
 * Created by danle on 4/4/16.
 */
(function () {
    angular
        .module('authDemo')
        .controller('LocalController', ['HomeService', '$location', LocalController]);

    function LocalController(HomeService, $location) {
        var vm = this;

        vm.linkLocal = function(email, password) {
            var data = {
                email: email,
                password: password
            };
            HomeService.linkLocal(data).then(function (data) {
                console.log('heyyy',data);
                if (data) {
                    $location.path('/home')
                }
            });
        }
    }
})();