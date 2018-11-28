define(['angular', 'jquery', 'httpMethod', 'lodash', 'moment', 'angular-animate', 'ngStorage', 'iscroll', 'datepicker', 'calendar'], function(angular, $, httpMethod, _, moment) {
    angular
        .module('checkingInPunchCardModule', ['httpMethod', 'ngStorage'])    
        .controller('homeCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', '$filter', function($scope, $rootScope, $log, httpMethod, $filter) {           
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

                $scope.absenteeismDate = [{
                    'day': '2018-11-23'.replace(/\-| |:/g, '')
                },{
                    'day': '2018-11-22'.replace(/\-| |:/g, '')
                }]
                $scope.dailyCardDate = [{
                    'day': '2018-11-10'.replace(/\-| |:/g, '')
                },{
                    'day': '2018-11-11'.replace(/\-| |:/g, '')
                }]
                $scope.leaveDate = [{
                    'day': '2018-11-13'.replace(/\-| |:/g, '')
                },{
                    'day': '2018-11-14'.replace(/\-| |:/g, '')
                }]             
            };
           
            $scope.showCard = false;
            $scope.checkingCard = function(){
                $scope.showCard = true;
            }
            $scope.close = function(){
                $scope.showCard = false;
            }
            var newDate = new Date();
            Date.prototype.format = function(format) {
                var date = {
                       "M+": this.getMonth() + 1,
                       "d+": this.getDate(),
                       "h+": this.getHours(),
                       "m+": this.getMinutes(),
                       "s+": this.getSeconds(),
                       "q+": Math.floor((this.getMonth() + 3) / 3),
                       "S+": this.getMilliseconds()
                };
                if (/(y+)/i.test(format)) {
                       format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                for (var k in date) {
                       if (new RegExp("(" + k + ")").test(format)) {
                              format = format.replace(RegExp.$1, RegExp.$1.length == 1
                                     ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                       }
                }
                return format;
            }
            $scope.nowTime = newDate.format('h:m');
            $scope.nowDate = newDate.format('yyyy-MM-dd hh:mm');
        }])
        .directive('calendar', function() {
            return {
                restrict: 'EA',
                scope: {
                    absenteeismDate: '@absenteeismDate',
                    dailyCardDate: '@dailyCardDate',
                    leaveDate: '@leaveDate'
                },
                template: '<div class="calendar"></div>',
                link: function(scope, iElm, iAttrs, $filter) {
                    $this = $(iElm);
                    scope.$watch('absenteeismDate', function(newObj) {
                       
                        var arr = JSON.parse(newObj);
                        if (arr.length) {
                            _.map(arr, function(item) {
                                $this.find('#' + item.day).addClass('widget-highlight');
                                $this.find('#' + item.day).click(function(){                                    
                                    var day = item.day.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");                                   
                                    sessionStorage.setItem(item.day, day);
                                    window.open('../../view/shanDongYiStoreWebchat/applyForAddPunchCard.html', '_self');                                 
                                })
                            });
                        };
                    });
                    scope.$watch('dailyCardDate', function(newObj) {
                        var arr = JSON.parse(newObj);
                        if (arr.length) {
                            _.map(arr, function(item) {
                                $this.find('#' + item.day).addClass('widget-card');                             
                            });
                        };
                    });
                    scope.$watch('leaveDate', function(newObj) {
                        var arr = JSON.parse(newObj);
                        if (arr.length) {
                            _.map(arr, function(item) {
                                $this.find('#' + item.day).addClass('widget-leave');                             
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