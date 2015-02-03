/**
 * Created by yangli on 2/02/15.
 */
/*globals angular*/

;(function(){
    'use strict';
    angular.module('app').service('storage', ['$window', function($window){
        this.ngLength = $window.localStorage.ngLength === "true";

        this.setNgLength = function(val){
            $window.localStorage.ngLength = val;
        };

    }]);
})();