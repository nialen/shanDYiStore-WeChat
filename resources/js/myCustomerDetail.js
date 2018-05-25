define(['angular', 'jquery', 'httpMethod', 'lodash', 'angular-animate', 'ngStorage'], function(angular, $, httpMethod, _) {
    angular
        .module('myCustomerDetailModule', ['httpMethod', 'ngStorage'])
        .filter('custStatusName', function(){
            return function(value){
                switch(value){
                    case 1000:
                        return '有效';
                        break;
                    case 1001:
                        return '主动暂停';
                        break;
                    case 1002:
                        return '异常暂停';
                        break;
                    case 1100:
                        return '失效';
                        break;
                }
            }
        })
        .filter('custLevelCnt', function(){
            return function(value){
                switch(value){
                    case 1000:
                        return '集团级';
                        break;
                    case 1100:
                        return '省级';
                        break;
                    case 1200:
                        return '本地网级';
                        break;
                    case 1300:
                        return '本地网以下级';
                        break;
                }
            }
        })
        .controller('homeCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', '$sessionStorage', function($scope, $rootScope, $log, httpMethod, $sessionStorage) {
            function GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            $scope.phone = function(number) {
                $('.call-tel').attr("href", 'tel:' + number);
            }
            $scope.myCustomer = $sessionStorage[GetQueryString('myCustomerList')] ? JSON.parse($sessionStorage[GetQueryString('myCustomerList')]) : [];

            $scope.selected = 1;
            $scope.change = function(index){
                $scope.selected = index;
            }

            var param = {
                'custId': $scope.myCustomer.custId,
            }
            httpMethod.custDetail(param).then(function (rsp) {
                $scope.myCustomerList = rsp.data;
            }, function () {
                $log.log('调用接口失败.');
            });

            //跳转至渠道列表页
            $scope.goToChannelList = function(myCustomerList){
                $sessionStorage[myCustomerList.custId] = JSON.stringify(myCustomerList);
                window.open('../../view/shanDongYiStoreWebchat/relationStore.html?custId=' + myCustomerList.custId, '_self');
            }
        }])
});