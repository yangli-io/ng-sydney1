/*globals angular, Firebase*/
(function(){
    'use strict';

    //var ref = new Firebase(URL);

    angular.module('app', ['ngRoute','ngAnimate','firebase','chart.js','hljs']).config(['$routeProvider', 'APP_VALUES', 'hljsServiceProvider', function($routeProvider, APP_VALUES, hljsServiceProvider){
        for (var i = 1; i <= APP_VALUES.maxRoutes; i ++){
            $routeProvider.when('/' + i, {
                templateUrl: 'slide-' + i + '.html'
            });
        }
        $routeProvider.otherwise({
            redirectTo: '/1'
        });

        hljsServiceProvider.setOptions({
            // replace tab with 4 spaces
            tabReplace: '    '
        });
    }]);
})();
