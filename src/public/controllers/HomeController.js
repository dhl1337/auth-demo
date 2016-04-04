/**
 * Created by danle on 4/2/16.
 */
(function () {
    angular
        .module('authDemo')
        .controller('HomeController', ['HomeService', HomeController]);

    function HomeController (HomeService) {
        var vm = this;

        HomeService.getCurrentuser().then(function(data) {
            if (data.facebook) {
                vm.currentUser = data.facebook;
            } else if (data.twitter) {
                vm.currentUser = data.twitter;
            } else if (data.local) {
                vm.currentuser = data.local;
            }
            console.log(vm.currentUser);
        });


    }
})();