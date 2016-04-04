/**
 * Created by danle on 4/2/16.
 */
(function () {
    angular
        .module('authDemo')
        .config(['$stateProvider','$urlRouterProvider', config]);

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('signup', {
                url: '/',
                templateUrl: '../views/login-signup.html',
                controller: 'LoginController',
                controllerAs: 'login'
            })
            .state('home', {
                url: '/home',
                templateUrl: '../views/home.html',
                controller: 'HomeController',
                controllerAs: 'home'
            })
            .state('connect', {
                url: '/connect-local',
                templateUrl: '../views/local-connect.html',
                controller: 'LocalController',
                controllerAs: 'local'
            });

        $urlRouterProvider.otherwise('/');
    }
})();