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
            vm.currentUser = data.facebook;
            //console.log('this beeter work',data)
        });
        //console.log('hey!', vm.currentUser);
    }
})();