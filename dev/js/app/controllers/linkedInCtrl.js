/**
 * Created by yangli on 3/02/15.
 */
/*globals angular*/

;(function(){
    'use strict';
    angular.module('app').controller('linkedInCtrl', ['pageConn', function(pageConn){
        var _this = this;
        this.profiles = pageConn.linkedIn.data;

        this.submitProfile = function(){
            pageConn.updateLinkedIn({
                name: _this.name,
                url: _this.url
            });
        };
    }]);
})();