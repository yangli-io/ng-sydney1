/**
 * Created by yangli on 26/01/15.
 */
/*globals angular*/

(function(){
    'use strict';
    angular.module('app').controller('pageCtrl', ['$location', 'pageConn', 'APP_VALUES', 'admin', function($location, pageConn, APP_VALUES, admin){
        var _this = this;
        pageConn.page.currentPage = $location.path().substring(1);
        this.currentSlide = pageConn.page.currentPage;
        this.maxSlides = APP_VALUES.maxRoutes;

        this.nextSlide = function(){
            pageConn.direction.right = true;
            _this.currentSlide++;
            pageConn.moveSlide(_this.currentSlide);
            $location.path('/' + _this.currentSlide);
        };

        this.previousSlide = function(){
            pageConn.direction.right = false;
            _this.currentSlide--;
            pageConn.moveSlide(_this.currentSlide);
            $location.path('/' + _this.currentSlide);
        };

        this.direction = pageConn.direction;


    }]);
})();
