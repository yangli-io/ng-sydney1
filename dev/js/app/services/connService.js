/**
 * Created by yangli on 28/01/15.
 */
/*globals angular,Firebase, console*/

;(function(){
    'use strict';
    angular.module('app').service('pageConn', ['APP_VALUES','$firebase', '$location', 'admin', function(APP_VALUES, $firebase, $location, admin){
        var _this = this;
        var ref = new Firebase("https://videoshare.firebaseio.com");
        var page = $firebase(ref.child('page'));
        var length = $firebase(ref.child('length'));
        var linkedIn = $firebase(ref.child('linkedIn'));

        this.direction = {
            right: true
        };

        this.page = this.page || {};
        this.page.currentPage = 0;
        this.page.maxPage = 1;

        this.graphsData = [(new Array(17)).join("0").split("")];
        var pageObj = page.$asObject();
        pageObj.$loaded().then(function(){
            _this.page.currentPage = pageObj.num;
            pageObj.$watch(function(){
                _this.direction.right = (_this.page.currentPage < pageObj.num);
                $location.path("/" + pageObj.num);
                _this.page.currentPage = pageObj.num;
            });
        });

        this.moveSlide = function(num){
            if (admin.isAdmin) {
                page.$update({ num: num });
            }
        };

        var lengthArr = length.$asArray();
        lengthArr.$loaded().then(function(){
            parseGraphData(lengthArr);
            lengthArr.$watch(function(){
                parseGraphData(lengthArr);
            });
        });

        this.updateGraph = function(data){
            lengthArr.$add(data);
        };

        function parseGraphData(data){
            var tempData = [(new Array(17)).join("0").split("")];
            for(var i = 0; i < data.length; i++){
                if (data[i].$value < 3){
                    tempData[0][0]++;
                } else if (data[i].$value > 48){
                    tempData[0][15]++;
                } else {
                    tempData[0][Math.round(data[i].$value/3) - 1]++;
                }
            }
            for (i = 0; i < _this.graphsData.length; i++){
                _this.graphsData[i] = tempData[i];
            }
        }

        //Linked in stuff
        this.linkedIn = this.linkedIn || {};
        this.linkedIn.data = [];

        var linkedInArr = linkedIn.$asArray();
        linkedInArr.$loaded().then(function(){
            fillLinkedIn(linkedInArr);

            linkedInArr.$watch(function(){
                fillLinkedIn(linkedInArr);
            });
        });

        function fillLinkedIn(data){
            while (_this.linkedIn.data.length > 0){
                _this.linkedIn.data.pop();
            }
            for(var i = 0; i < data.length; i ++){
                _this.linkedIn.data.push(data[i]);
            }

        }

        this.updateLinkedIn = function(data){
            linkedInArr.$add(data);
        };
    }]);
})();