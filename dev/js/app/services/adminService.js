/**
 * Created by yangli on 29/01/15.
 */
/* globals angular*/

;(function(){
    'use strict';
    angular.module('app').service('admin', ['$window', function($window){
        this.isAdmin = ($window.localStorage.isAdmin === "true");
    }]);
})();
