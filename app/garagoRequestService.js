/**
 * Created by roche_d on 18/05/15.
 */

(function (angular) {
    'use strict';

    function fmtDate(from, to) {
        if (from.length > 0 && to.length > 0) {
            return "Between " + from + " and " + to;
        } else if (from.length > 0) {
            return "From " + from;
        } else if (to.length > 0) {
            return "Before " + to;
        } else {
            return "Any";
        }
    }

    angular.module('garagoModule').
        factory('garagoRequestService', ['$http', function (http) {
            var url = (prod) ? ("http://garago.cleverapps.io") : ("http://127.0.0.1:8080");
            return {
                getRequests: function () {
                    var result = [];
                    http({
                        method: 'GET',
                        url: url + '/api/getAllRequest',
                        params: {key: 'fslkj45k54kjh'}
                    }).success(function (data) {
                        console.log('success');
                        console.log(data);
                        if (data.res && data.data.requests) {
                            data.data.requests.forEach(function (e) {
                                var when = fmtDate(e.req.when['date-from'], e.req.when['date-to']);
                                result.push({
                                    name: 'Stephane',
                                    insurance: 'Direct Assurance',
                                    contract: 'Premium',
                                    what: e.req.what[0],
                                    when: when,
                                    ccar: (e.req.courtesyCar) ? ('Yes') : ('No'),
                                    where: e.req.where,
                                    id: e.id
                                });
                            });
                        }
                    }).error(function (err) {
                        console.log('error');

                    });
                    return result;
                },
                answerRequest: function (msg, success, fail) {
                    console.log('post');
                    console.log(msg);
                    http({
                        method: 'POST',
                        url: url + '/api/answerRequest',
                        data: {
                            key: 'fslkj45k54kjh',
                            id: msg.id,
                            data: {
                                price: msg.offerPrice,
                                msg: msg.offerText,
                                date: msg.offerDate
                            }
                        }
                    }).success(function (data) {
                        if (data.res) {
                            success(data.data);
                        } else {
                            fail(data.data);
                        }
                    }).error(function (err) {
                        console.log('post failed');
                    });
                }
            };
        }]);

} (angular));