/**
 * Created by roche_d on 17/05/15.
 */

var prod = true;

(function (angular, io) {
    'use strict';


    angular.module('garagoModule', []).
        controller('RequestListCtrl', ['$scope', 'garagoRequestService', function ($scope, garagoRequestService, timeout) {
            $scope.requests = [];
            $scope.refreshRequests = function () {
                $scope.requests = garagoRequestService.getRequests();
            };

            $scope.refreshRequests();

            var url = (prod) ? ("http://garago.cleverapps.io/") : ("http://localhost:8080/");
            /*var socket = io.connect(url);
            socket.on('newRequest', function (data) {
               console.log('new req from server');
            });*/
        }]);

} (angular, io));