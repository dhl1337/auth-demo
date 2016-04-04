/**
 * Created by danle on 4/2/16.
 */
(function () {
    angular
        .module('authDemo')
        .service('HomeService', HomeService);

    function HomeService ($http, $state) {
        this.getCurrentuser = function (enforce) {
            return $http({
                method: 'GET',
                url: '/auth/current'
            }).then(function (response) {
                return response.data
            }).catch(function (err) {
                if(err.status === 401 && enforce) {
                    $state.go('home');
                }
            });
        };
    }
})();