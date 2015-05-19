/**
 * Created by roche_d on 17/05/15.
 */

var prod = true;

(function (angular, io) {
    'use strict';


    angular.module('garagoModule', []).
        controller('RequestListCtrl', ['$scope', '$interval', 'garagoRequestService', function ($scope, interval, garagoRequestService) {
            $scope.requests = [];
            $scope.msg = {};
            $scope.refreshRequests = function () {
                var ref = garagoRequestService.getRequests();
                console.log('compare');
                console.log(ref === $scope.requests);
                $scope.requests = ref;
            };
            $scope.answerRequest = function (id) {
                console.log('answer');
                console.log(id);
                $scope.selectedId = id;
                $('#answerModal').openModal();

            };
            $scope.sendAnswerRequest = function (selected) {
              console.log('ca rentre');
                console.log(selected);
                console.log($scope.msg);
                if (!selected) return;
                garagoRequestService.answerRequest({
                    offerPrice: $scope.msg.price,
                    offerText: $scope.msg.text,
                    offerDate: $scope.msg.date,
                    id: selected.id,
                    garageName: 'Georges'
                }, function (data) {
                    console.log('success');
                    console.log(data);
                    $scope.refreshRequests();
                    $scope.msg = {};
                    $('#answerModal').closeModal();
                }, function (err) {
                    Materialize.toast('An error occurred, please fill all the fields !', 2000);
                    console.log('something failed !');
                    console.log(err);
                });

            };

            var url = (prod) ? ("http://garago.cleverapps.io/") : ("ws://127.0.0.1:8080/");
            //var socket = io.connect(url);//{transports: ['websocket', 'polling', 'flashsocket']}
            /*socket.on('newRequest', function (data) {
               console.log('new req from server');
            });*/

            var loop;

            loop = interval(function () {
                //console.log('loop');
                //console.log($scope);
                $scope.refreshRequests();
            }, 10000);
            $scope.refreshRequests();

            $scope.cancelLoop = function () {
                if (angular.isDefined(loop)) {
                    interval.cancel(loop);
                    stop = undefined;
                }
            };
            $scope.$on('$destroy', function () {
                $scope.cancelLoop();
            });
        }]);

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 1, // Creates a dropdown of 15 years to control year
        closeOnSelect: true
    });

} (angular, io));