define(['angular', 'jquery', 'httpMethod', 'lodash', 'angular-animate', 'ngStorage', 'ng-infinite-scroll'], function(angular, $, httpMethod, _) {
    angular
        .module('telphoneListModule', ['httpMethod',  'infinite-scroll'])
        .factory('CustomerQuery', ['$filter', 'httpMethod', '$log', function($filter, httpMethod, $log){
            var CustomerQuery = function() {
                this.busy = false;
                this.page = 1;
                this.pageSize = 10;
                this.phoneList = [];
            };
            //版本更新查询
            CustomerQuery.prototype.queryMyCustomer =  function(str){
                var _this = this,
                    params = {
                        'str': str,
                        'role': '',
                        'curPage': _this.page,
                        'pageSize': _this.pageSize
                    };
                if(_this.busy){
                    return;
                }//判断当前数据是否请求完成
                _this.busy = true;
                httpMethod.phoneList(params).then(function(rsp) {
                    if (rsp.success) {
                        if(rsp.data.rows.length > 0){
                            var items = rsp.data.rows;
                            items.forEach(function(item) {
                                _this.phoneList.push(item);
                            });
                            _this.busy = false;
                            _this.page += 1;
                            if(_this.page > rsp.data.total){
                                _this.busy = true;
                            }
                        }else{
                            _this.busy = true;
                        }
                        $log.log('调用接口成功.');
                    }else{
                        _this.busy = true;
                    }
                },function() {
                    $log.log('调用接口失败.');
                });
            };
            return CustomerQuery;
        }])
        .controller('homeCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'CustomerQuery', function($scope, $rootScope, $log, httpMethod, CustomerQuery) {
            $scope.customerQuery = new CustomerQuery();
            $scope.phone = function(number) {
                $('.call-tel').attr("href", 'tel:' + number);
            }
        }])
});