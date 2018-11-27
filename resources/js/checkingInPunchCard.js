define(['angular', 'jquery', 'httpMethod', 'lodash', 'moment', 'angular-animate', 'ngStorage', 'calendar'], function(angular, $, httpMethod, _, moment) {
    angular
        .module('checkingInPunchCardModule', ['httpMethod', 'ngStorage'])    
        .controller('homeCtrl', ['$scope', '$log', 'httpMethod', function($scope, $log, httpMethod) {
            $scope.dailyStaffResult = [];
            $scope.queryDaily = function(firstTime, endTime) {
                var firstDate, endDate, firstDatefor, endDatefor;
                firstDate = new Date();
                endDate = new Date();
                firstDate.setDate(1);
                endDate.setMonth(endDate.getMonth() + 1);
                endDate.setDate(0);
                firstDatefor = moment(firstDate).format('YYYY-MM-DD');
                endDatefor = moment(endDate).format('YYYY-MM-DD');

                var param = {
                    'startDate': firstTime || firstDatefor,
                    'endDate': endTime || endDatefor
                };

                // httpMethod.queryDailyStaffInspectedStoreCount(param).then(function(rsp) {
                //     var arr = [];
                //     _.map(rsp.data, function(item, index) {
                //         var obj = {
                //             'day': item.timeCd.replace(/\-| |:/g, ''),
                //             'times': item.dayCount
                //         };
                //         arr.push(obj);
                //     });
                //     $scope.dailyStaffResult = arr;
                // })

                // $scope.dailyStaffResult = ['2018-11-23', '2018-11-22']
                $scope.dailyStaffResult = [{
                    'day': '2018-11-23'.replace(/\-| |:/g, ''),
                    'times': 3
                },{
                    'day': '2018-11-22'.replace(/\-| |:/g, ''),
                    'times': 3
                }]
            };
        }])
        .directive('calendar', function() {
            return {
                restrict: 'EA',
                scope: {
                    dailyStaffResult: '@dailyStaffResult'
                },
                template: '<div class="calendar"></div>',
                link: function($scope, iElm, iAttrs) {
                    $this = $(iElm);
                    $scope.$watch('dailyStaffResult', function(newObj) {
                        var arr = JSON.parse(newObj);
                        if (arr.length) {
                            _.map(arr, function(item) {
                                $this.find('#' + item.day).addClass('widget-highlight').append('<label>巡捡' + item['times'] + '次</label>');
                            });
                        };
                    });
                    $('.calendar').calendar({
                        highlightRange: [],
                        isRange: true,
                        onChange: function(day) {
                            var firstDate, endDate, firstDatefor, endDatefor;
                            firstDate = new Date(day.year + '-' + day.month + '-' + day.day);
                            endDate = new Date(day.year + '-' + day.month + '-' + day.day);
                            endDate.setMonth(endDate.getMonth() + 1);
                            endDate.setDate(0);
                            firstDatefor = moment(firstDate).format('YYYY-MM-DD');
                            endDatefor = moment(endDate).format('YYYY-MM-DD');

                            angular.element(iElm).scope().queryDaily(firstDatefor, endDatefor);
                        }
                    });
                }
            };
        });
        
});