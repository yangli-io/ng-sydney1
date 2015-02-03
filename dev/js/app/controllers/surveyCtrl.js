/**
 * Created by yangli on 29/01/15.
 */
/* globals angular, console*/

;(function(){
    'use strict';
    angular.module('app').controller('surveyCtrl', ['pageConn', 'storage', function(pageConn, storage){
        this.labels = [3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48];
        this.series = ['Series A', 'Series B'];
        this.data = pageConn.graphsData;

        this.onClick = function (points, evt) {
            console.log(points, evt);
        };

        this.sendData = function(){
            var months = (this.months) ? this.months : 0;
            months = (this.years) ? this.years * 12 + months : months;
            this.showLengthGraph = true;
            storage.setNgLength("true");
            pageConn.updateGraph(months);
        };

        this.showLengthGraph = storage.ngLength;
    }]);
})();