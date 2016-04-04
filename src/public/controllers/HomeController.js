/**
 * Created by danle on 4/2/16.
 */
(function () {
    angular
        .module('authDemo')
        .controller('HomeController', ['HomeService', '$location', HomeController]);

    function HomeController (HomeService, $location) {
        var vm = this;

        HomeService.getCurrentuser().then(function(data) {
            vm.currentUser = data;
        });

        vm.unlinkFB = function() {
            HomeService.unlinkFacebook().then(function(data) {
                if (data) {
                    $location.path('/home')
                }
            })
        };

        vm.unlinkTwitter = function() {
            HomeService.unlinkTwitter().then(function(data) {
                if (data) {
                    $location.path('/home')
                }
            })
        };

        vm.unlinkLocal = function() {
            HomeService.unlinklocal().then(function(data) {
                if (data) {
                    $location.path('/home')
                }
            })
        };
    }
})();